#!/usr/bin/env python3
"""Tách một lần năm bộ dữ liệu của site mới (src/data/*.yml) từ site cũ ở ../psyche-zero/ (việc D1.2).

Chạy từ thư mục gốc của repo:  python3 tools/du_lieu/tach.py [--ghi-de] > /tmp/tach.md
Ghi src/data/linh-vuc.yml, trang.yml, nguon.yml, nghien-cuu.yml, ngo-nhan.yml; in ra (Markdown) các chỗ site cũ tự mâu
thuẫn và các chỗ script không tự quyết, để chép vào báo cáo. Chỉ đọc ../psyche-zero/ (file; commit lấy bằng git nếu có).

- linh-vuc.yml, trang.yml: từ bảng của plans/lam-lai/anh_xa.py (bản đồ Nền tảng đã duyệt), sắc độ màu theo bản mẫu đã
  chọn (plans/lam-lai/ban-mau/).
- nguon.yml: mục "## Nguồn" của mọi trang (trừ sach/*, là trang gộp từ các trang khác), gộp theo DOI, URL hay (tác giả
  đầu, năm, tên bài); cộng nguồn của 60 thẻ ngộ nhận (docs/assets/data/myths.json).
- nghien-cuu.yml: nghiên cứu chính của 15 trang Thí nghiệm (trang nhà) và các nghiên cứu được nhắc ở từ 3 trang trở lên;
  trang nhà của nhóm sau là đề xuất của script, đợt 2 (D2-0) duyệt.
- ngo-nhan.yml: 60 thẻ của myths.json.

src/data/ đã có dữ liệu thì script từ chối ghi, trừ khi có cờ --ghi-de. Chỉ ghi đè trước khi dữ liệu được kiểm định;
từ đợt 2, src/data/ sửa tay theo hồ sơ kiểm định. Cần PyYAML (requirements.txt).
"""
import collections
import importlib.util
import json
import os
import pathlib
import re
import subprocess
import sys
import unicodedata

import yaml

ROOT = pathlib.Path(__file__).resolve().parents[2]
CU = ROOT.parent / "psyche-zero"
DOCS = CU / "docs"
OUT = ROOT / "src" / "data"
HEAD = ("# Sinh một lần bằng tools/du_lieu/tach.py từ ../psyche-zero/ (commit {commit}), việc D1.2.\n"
        "# Chưa kiểm định, chưa khóa. Từ nay sửa tay; trường và kiểu: src/du-lieu.mjs.\n")
TEP = ("linh-vuc.yml", "trang.yml", "nguon.yml", "nghien-cuu.yml", "ngo-nhan.yml")
bao = collections.defaultdict(list)  # mục báo cáo -> các dòng

# Sắc độ (hue, 0–359) của từng lĩnh vực: theo bản mẫu đã chọn (plans/lam-lai/ban-mau/ma/du-lieu.mjs, phương án B)
MAU = {
    "phuong-phap": 232, "co-so-sinh-hoc": 350, "tri-giac-chu-y": 195, "y-thuc-giac-ngu": 262, "hoc-tap": 145,
    "tri-nho": 215, "tu-duy-tri-tue": 38, "phat-trien": 100, "cam-xuc-dong-luc": 12, "tinh-cach": 290,
    "tam-ly-xa-hoi": 325, "cang-thang-suc-khoe": 25, "hanh-phuc": 52, "suc-khoe-tam-than": 172,
}

# Người (họ) của nghiên cứu chính ở mỗi trang Thí nghiệm: nguồn trong mục Nguồn của trang có một trong các họ này ở
# danh sách tác giả, và năm (năm của ấn bản gốc nếu có) không sau năm ghi ở đây, là nguồn gốc của nghiên cứu. Khỉ đột vô
# hình chỉ lấy Simons và Chabris (1999): các bài về mù thay đổi cùng trang có thể có trang nhà khác (trai-nghiem/
# mu-thay-doi, kham-pha/chu-y-tri-giac/nhin-ma-khong-thay). Danh sách đầy đủ in vào báo cáo để duyệt.
THI_NGHIEM = {
    "milgram": (["Milgram"], 1975), "asch": (["Asch"], 1960), "darley-latane": (["Darley", "Latané"], 1975),
    "zimbardo": (["Haney", "Zimbardo"], 1975), "robbers-cave": (["Sherif"], 1970), "pygmalion": (["Jacobson"], 1970),
    "khi-dot-vo-hinh": (["Chabris"], 2000), "pavlov": (["Pavlov"], 1930), "skinner": (["Skinner"], 1960),
    "little-albert": (["Watson"], 1925), "seligman": (["Seligman", "Overmier"], 1967), "bandura": (["Bandura"], 1965),
    "harlow": (["Harlow"], 1965), "keo-deo": (["Mischel"], 1990), "schachter-singer": (["Schachter"], 1965),
}


class Dumper(yaml.SafeDumper):
    """Danh sách chỉ gồm giá trị đơn viết trên một dòng ([a, b]); bản ghi viết mỗi trường một dòng."""


def _seq(d, data):
    flow = all(not isinstance(x, (list, dict)) for x in data)
    return d.represent_sequence("tag:yaml.org,2002:seq", data, flow_style=flow)


def _map(d, data):
    return d.represent_mapping("tag:yaml.org,2002:map", data.items(), flow_style=False)


Dumper.add_representer(list, _seq)
Dumper.add_representer(dict, _map)


def ghi(ten, ban_ghi, commit, them=""):
    OUT.mkdir(parents=True, exist_ok=True)
    text = yaml.dump(ban_ghi, Dumper=Dumper, allow_unicode=True, sort_keys=False, width=1_000_000)
    (OUT / ten).write_text(HEAD.format(commit=commit) + them + "\n" + text, encoding="utf-8")


def nap_anh_xa():
    spec = importlib.util.spec_from_file_location("anh_xa", ROOT / "plans" / "lam-lai" / "anh_xa.py")
    ax = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(ax)
    return ax


CHU_LA = str.maketrans({"đ": "d", "Đ": "D", "æ": "ae", "Æ": "Ae", "ø": "o", "Ø": "O", "œ": "oe", "Œ": "Oe", "ß": "ss",
                        "ł": "l", "Ł": "L", "ð": "d", "þ": "th"})


def khong_dau(s):
    """Chữ thường, bỏ dấu (tiếng Việt và chữ Latinh khác: æ thành ae, ø thành o…) và mọi ký tự không phải a–z, 0–9."""
    s = unicodedata.normalize("NFD", s.translate(CHU_LA))
    return re.sub(r"[^a-z0-9]", "", "".join(c for c in s if unicodedata.category(c) != "Mn").lower())


# ---------- linh-vuc.yml, trang.yml ----------
def linh_vuc(ax):
    return [{"id": k, "ten": v, "thu_tu": i + 1, "mau": MAU[k]} for i, (k, v) in enumerate(ax.LINH_VUC.items())]


def trang(ax):
    recs = []
    for t in ax.nav_pages():
        _, tang, lv, _ = ax.phan_loai(t)
        r = {"id": t, "tang": tang}
        if lv:
            r["linh_vuc"] = lv
        recs.append(r)
    for t, _, tang, lv, _, _ in ax.TRANG_MOI:
        recs.append({"id": t, "tang": tang, "linh_vuc": lv, "moi": True})
    return recs


# ---------- nguon.yml ----------
NAM = r"(?:\d{1,2}/){0,2}(\d{4}[a-z]?(?:/\d{4}[a-z]?)?|n\.d\.)"
VIET = re.compile(r"[ăâđêôơưàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]", re.I)


def muc_nguon(text):
    """Các dòng của mục "## Nguồn" (mỗi dòng một nguồn, bỏ dấu đầu dòng)."""
    m = re.search(r"^## Nguồn[^\n]*\n(.*?)(?=^## |\Z)", text, flags=re.M | re.S)
    if not m:
        return []
    return [re.sub(r"^\s*[-*]\s+", "", d).strip() for d in m.group(1).splitlines() if re.match(r"^\s*[-*]\s+", d)]


def tach_link(s):
    """(chữ đã bỏ link, doi, url). Link dạng <…>, [chữ](…) hay viết trần."""
    doi = url = None
    links = re.findall(r"<(https?://[^>\s]+)>", s) + re.findall(r"\]\((https?://[^)\s]+)\)", s)
    links += re.findall(r"(?<![<(])(https?://[^\s>)]+)", s)
    for u in links:
        u = u.rstrip(".,;")
        m = re.search(r"doi\.org/(10\.\d{4,9}/\S+)", u, flags=re.I)
        if m and not doi:
            doi = m.group(1)
        elif not m and not url:
            url = u
    s = re.sub(r"<https?://[^>\s]+>", "", s)
    s = re.sub(r"\[([^\]]*)\]\(https?://[^)\s]+\)", r"\1", s)
    s = re.sub(r"https?://[^\s>)]+", "", s)
    return re.sub(r"\s+", " ", s).strip(), doi, url


def bo_chu_thich(s):
    """Bỏ lời chú thích tiếng Việt ở cuối dòng nguồn: trong ngoặc ("(sách)", "(Nguồn gốc quy ước…)"), sau gạch dài
    ("— bài báo gốc: 4 nghiên cứu"), hay câu dẫn của một link đã bỏ ("Bản scan toàn văn:"); bỏ lần lượt cho tới hết.
    Trả về (chữ, chú thích; nhiều chú thích nối bằng " / ")."""
    s, cac = s.strip(), []
    while True:
        m = re.search(r"\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)\.?$", s)
        i = s.rfind(" — ")
        m2 = re.search(r"(?<=\.)\s+([^.]*:)\s*$", s)
        if m and VIET.search(m.group(1)) and not re.match(r"tr\.\s*\d", m.group(1)):
            s, ct = s[: m.start()].rstrip(), m.group(1)
        elif i > 0 and VIET.search(s[i:]):
            s, ct = s[:i].rstrip(), s[i + 3:].strip()
        elif m2 and VIET.search(m2.group(1)):
            s, ct = s[: m2.start()].rstrip(), m2.group(1)
        else:
            break
        cac.insert(0, ct)
    return s, (" / ".join(cac) or None)


def bo_sao(s):
    return re.sub(r"\*+", "", s).strip()


def phan_tich(dong):
    """Một dòng nguồn kiểu APA thành bản ghi; trả về (bản ghi, chú thích) hay (None, lý do)."""
    # Ngoặc đứng sau link cuối dòng là lời chú thích của trang, kể cả khi không có chữ có dấu ("(thang BarOn EQ-i, n = 164)")
    sau_link = re.search(r"(<https?://[^>\s]+>|\]\(https?://[^)\s]+\))\s*(\((?:[^()]|\([^()]*\))*\))\.?\s*$", dong)
    ct_sau_link = None
    if sau_link:
        ct_sau_link = sau_link.group(2)[1:-1]
        dong = dong[: sau_link.start(2)].rstrip()
    chu, doi, url = tach_link(dong)
    chu, chu_thich = bo_chu_thich(chu)
    if ct_sau_link and not url:  # "(bản trực tuyến: <https://…>)": link trong lời chú thích là bản khác của cùng nguồn
        url = tach_link(ct_sau_link)[2]
    if ct_sau_link:
        chu_thich = " / ".join(x for x in (chu_thich, ct_sau_link) if x)
    m = re.match(rf"^(?P<tg>.+?)\s*\({NAM}(?:,[^)]*)?\)[.:]?\s*(?P<con>.*)$", chu)
    if not m:
        return phan_tich_tu_do(chu, doi, url, chu_thich)
    tg = m.group("tg").strip().rstrip(".") + ("." if m.group("tg").strip().endswith(".") else "")
    nam_s = m.group(2)
    con = m.group("con").strip()
    r = {"tac_gia": tg.strip()}
    r["nam"] = int(nam_s) if re.fullmatch(r"\d{4}", nam_s) else nam_s
    # Loại và tên, nơi đăng
    m_ch = re.match(r"^(?P<ten>.+?[.?!])\s+(?:Trong|In)\s+(?P<nd>.+)$", con)
    if con.startswith("*"):
        m2 = re.match(r"^\*(?P<ten>[^*]+)\*(?P<sau>.*)$", con)
        ten, sau = m2.group("ten").strip(), m2.group("sau").strip()
        # phần sau dấu phẩy tới dấu chấm đầu tiên (ngoài ngoặc) còn là tên: "*Diagnostic…*, Fifth Edition, Text Revision (DSM-5-TR)."
        m4 = re.match(r"^,\s*((?:[^.()]|\([^)]*\))+)\.\s*(.*)$", sau)
        if m4:
            ten, sau = f"{ten}, {m4.group(1).strip()}", m4.group(2).strip()
        # phần trong ngoặc ngay sau tên (lần xuất bản, [Fact sheet]…) thuộc tên
        m3 = re.match(r"^((?:\s*[(\[][^)\]]*[)\]])*)\.?\s*(.*)$", sau)
        if m3.group(1).strip():
            ten += " " + m3.group(1).strip()
        nd = m3.group(2).strip().rstrip(".")
        if nd.startswith(":"):  # "*Tên*: lời mô tả" — phần sau dấu hai chấm là lời của trang, không phải nơi đăng
            bao["Lời chú thích ở cuối dòng nguồn (giữ trong trang, không đưa vào nguon.yml)"].append(f"(sau tên sách) {nd[1:].strip()}")
            nd = ""
        r["loai"] = "trang-web" if re.search(r"\[[^\]]+\]", m3.group(1)) else "sach"
        r["ten"] = ten.rstrip(".")
        if nd:
            r["noi_dang"] = bo_sao(nd)
    elif m_ch and "*" in m_ch.group("nd"):
        r["loai"] = "chuong-sach"
        r["ten"] = m_ch.group("ten").rstrip(".")
        r["noi_dang"] = bo_sao(("Trong " if con[m_ch.start("nd") - 6:].startswith("Trong") else "In ") + m_ch.group("nd")).rstrip(".")
    elif "*" in con:
        i = con.index("*")
        r["loai"] = "bai-bao"
        r["ten"] = con[:i].strip().rstrip(".")
        r["noi_dang"] = bo_sao(con[i:]).rstrip(".")
    else:
        r["loai"] = "trang-web" if url else "khac"
        r["ten"] = con.rstrip(".")
    r["ten"] = bo_sao(r.get("ten", "")).lstrip(":;,. ")
    if not r.get("ten"):
        return None, "không tách được tên bài"
    if doi:
        r["doi"] = doi
    if url:
        r["url"] = url
    return ap_chu_thich(r, chu_thich), chu_thich


LOAI_CHU_THICH = {"sách": "sach", "chương sách": "chuong-sach", "báo cáo": "bao-cao", "khuyến cáo": "bao-cao"}


def ap_chu_thich(r, chu_thich):
    """Lời chú thích cuối dòng cho biết loại nguồn ("(sách)", "(chương sách)", "(báo cáo)") hay năm của ấn bản gốc
    ("(Ấn bản gốc 1961.)"): ghi vào bản ghi."""
    if chu_thich:
        dau = re.split(r"[;:,]", chu_thich)[0].strip().lower()
        if dau in LOAI_CHU_THICH:
            r["loai"] = LOAI_CHU_THICH[dau]
        m = re.search(r"Ấn bản gốc (\d{4})", chu_thich)
        if m:
            r["nam_goc"] = int(m.group(1))
    return r


def phan_tich_tu_do(chu, doi, url, chu_thich):
    """Dòng nguồn không theo APA (không có "(năm)." sau tên tác giả): tin tức, Wikipedia, văn bản luật, báo cáo của
    cơ quan. Tác giả là phần trước dấu chấm hay dấu phẩy đầu tiên; năm là năm đầu tiên gặp trong dòng, không có thì
    "n.d.". Tham chiếu tới trang khác của site (link .md, không có link ngoài) không phải nguồn: bỏ."""
    if re.search(r"\]\([^)\s]+\.md[#)]", chu) and not (doi or url):
        return None, "tham chiếu tới trang khác của site, không phải nguồn"
    chu2 = bo_sao(chu)
    m = re.match(r"^(?P<tg>[^.,(:]+?)\s*(?:\((?P<ngoac>[^)]*)\))?\s*[.,:]\s*(?P<con>.+)$", chu2)
    if not m:
        return None, "không tách được"
    nam = re.search(r"\b(1[89]\d{2}|20\d{2})\b", chu2)
    r = {"loai": "trang-web" if url and not doi else "khac", "tac_gia": m.group("tg").strip(),
         "nam": int(nam.group(1)) if nam else "n.d.", "ten": m.group("con").strip().rstrip(".")}
    if doi:
        r["doi"] = doi
    if url:
        r["url"] = url
    bao["Dòng nguồn không theo APA, script tách theo cách đơn giản (D2-0 sửa)"].append(f"{chu[:160]}")
    return ap_chu_thich(r, chu_thich), chu_thich


def ho_dau(tac_gia):
    """Họ của tác giả đầu (không dấu), hay chữ đầu các từ của tên tổ chức (American Psychiatric Association: apa)."""
    dau = tac_gia.split(",")[0].strip()
    if "," not in tac_gia or len(dau.split()) > 2 and not re.search(r"\b[A-Z]\.", tac_gia.split(",")[1] if "," in tac_gia else ""):
        tu = [w for w in re.findall(r"[A-ZĐ][\w-]*", tac_gia) if w.lower() not in ("of", "and", "the", "for")]
        if len(tu) >= 2 and "," not in tac_gia:
            return khong_dau("".join(w[0] for w in tu))
    return khong_dau(dau)


def cac_khoa(r):
    """Các khóa nhận ra cùng một nguồn ghi ở nhiều chỗ: DOI; URL; (họ tác giả đầu, năm, 30 chữ đầu của tên); chữ viết
    tắt trong ngoặc ở tên, như "(DSM-5-TR)", để "*DSM-5-TR*" và tên đầy đủ của sách ấy là một."""
    ho, nam = ho_dau(r["tac_gia"]), (re.sub(r"\D", "", str(r["nam"]))[:4] or "nd")
    k = [f"ten:{ho}:{nam}:{khong_dau(r['ten'])[:30]}"]
    k += [f"ten:{ho}:{nam}:{khong_dau(a)}" for a in re.findall(r"\(([A-Z][A-Z0-9-]{2,})\)", r["ten"])]
    if r.get("doi"):
        k.append("doi:" + r["doi"].lower())
    if r.get("url"):
        k.append("url:" + r["url"].rstrip("/").lower())
    return k


def nguon_cua_the(mid, s):
    """Bản ghi tạm từ nguồn của một thẻ ngộ nhận (myths.json: cite, url)."""
    cite, url = s["cite"], s.get("url")
    tam, _ = phan_tich(cite + (f" <{url}>" if url else ""))
    if tam is not None:
        return tam
    # cite không có (năm): Beyerstein, B. L. Tên bài. Nơi đăng
    m = re.match(r"^(?P<tg>(?:[^.,]+, (?:[A-Z]\. ?)+,? ?(?:&? ?)?)+)\s*(?P<con>.+)$", cite)
    tg = m.group("tg").strip().rstrip(",") if m else cite.split(".")[0]
    con = m.group("con") if m else cite
    phan = [x.strip() for x in re.split(r"(?<=[?.!])\s+", con) if x.strip()]
    tam = {"tac_gia": tg, "nam": "n.d.", "loai": "bai-bao" if len(phan) > 1 else "khac", "ten": phan[0].rstrip(".")}
    if len(phan) > 1:
        tam["noi_dang"] = " ".join(phan[1:]).rstrip(".")
    _, doi, u2 = tach_link(f"<{url}>") if url else ("", None, None)
    if doi:
        tam["doi"] = doi
    if u2:
        tam["url"] = u2
    bao["Nguồn của thẻ ngộ nhận không ghi năm"].append(f"`{mid}`: {cite}")
    return tam


def nguon(trang_ids):
    """Bản ghi nguồn, danh sách trang dẫn từng nguồn, và ánh xạ id nguồn của myths.json sang id mới.

    Mỗi lần một nguồn được ghi (ở mục Nguồn của một trang, hay ở một thẻ ngộ nhận) là một lần gặp. Các lần gặp có chung
    một khóa (cac_khoa) là cùng một nguồn: gộp thành một bản ghi, lấy cách ghi của lần gặp đầu tiên có DOI (không có
    thì lần gặp đầu tiên), trường còn thiếu lấy ở các lần gặp khác; chỗ ghi khác nhau in vào báo cáo."""
    gap = []  # (bản ghi tạm, trang, id thẻ ngộ nhận hay None)
    for p in sorted(DOCS.rglob("*.md")):
        t = p.relative_to(DOCS).as_posix()[:-3]
        if t.startswith("sach/"):
            continue
        for dong in muc_nguon(p.read_text(encoding="utf-8")):
            r, ly_do = phan_tich(dong)
            if r is None:
                _, doi, _ = tach_link(dong)
                them = f"; có DOI {doi}: D2-0 thêm bản ghi theo Crossref" if doi else ""
                bao["Dòng nguồn không tách được, không đưa vào nguon.yml"].append(f"`{t}`: {dong} ({ly_do}{them})")
                continue
            if ly_do:
                bao["Lời chú thích ở cuối dòng nguồn (giữ trong trang, không đưa vào nguon.yml)"].append(f"`{t}`: ({ly_do})")
            gap.append((r, t, None))
    myths = json.loads((DOCS / "assets" / "data" / "myths.json").read_text(encoding="utf-8"))
    for mid, s in myths["sources"].items():
        gap.append((nguon_cua_the(mid, s), "ngo-nhan/index", mid))

    # Gộp các lần gặp có chung khóa (union–find)
    cha = list(range(len(gap)))

    def goc(i):
        while cha[i] != i:
            cha[i] = cha[cha[i]]
            i = cha[i]
        return i

    dau_tien = {}
    for i, (r, _, _) in enumerate(gap):
        for k in cac_khoa(r):
            if k in dau_tien:
                cha[goc(i)] = goc(dau_tien[k])
            else:
                dau_tien[k] = i
    nhom = collections.defaultdict(list)
    for i in range(len(gap)):
        nhom[goc(i)].append(i)

    ban_ghi, trang_cua_nhom, myth_nhom = [], [], []
    for g in sorted(nhom.values(), key=min):
        dois = {gap[i][0]["doi"].lower() for i in g if gap[i][0].get("doi")}
        if len(dois) > 1:
            bao["Gộp nhầm: một nhóm có nhiều DOI (sửa tach.py)"].append(", ".join(sorted(dois)))
        chinh = next((i for i in g if gap[i][0].get("doi")), g[0])
        rec = dict(gap[chinh][0])
        for i in g:
            r, t, _ = gap[i]
            for truong in ("doi", "url", "noi_dang", "nam_goc"):
                if truong in r and truong not in rec:
                    rec[truong] = r[truong]
            if i != chinh and not gap[i][2]:  # thẻ ngộ nhận ghi rút gọn (et al., tên ngắn): không so
                for truong in ("tac_gia", "nam", "ten", "noi_dang", "loai"):
                    a, b = str(rec.get(truong, "")), str(r.get(truong, ""))
                    if b and khong_dau(a) != khong_dau(b):
                        bao["Cùng một nguồn, site cũ ghi khác nhau (giữ cách ghi có DOI, không có thì cách ghi đầu tiên)"].append(
                            (rec, truong, a, b, t))
        ban_ghi.append(rec)
        trang_cua_nhom.append(list(dict.fromkeys(gap[i][1] for i in g)))
        myth_nhom.append([gap[i][2] for i in g if gap[i][2]])

    # Đặt id: họ tác giả đầu + năm; trùng thì thêm b, c… theo thứ tự gặp. Nguồn chỉ có ở thẻ ngộ nhận mà không ghi năm
    # thì giữ id của myths.json (như beyerstein-10).
    dung = set()
    recs, trang_cua, id_myth = [], {}, {}
    for r, ts, mids in zip(ban_ghi, trang_cua_nhom, myth_nhom):
        nam = str(r["nam"])
        chi_the = all(tr == "ngo-nhan/index" for tr in ts)
        if nam == "n.d." and chi_the and mids[0] not in dung:
            moi = mids[0]
        else:
            nen = (ho_dau(r["tac_gia"]) or "nguon") + (re.sub(r"[^0-9a-z]", "", nam.split("/")[0]) if nam != "n.d." else "")
            moi, i = nen, 1
            while moi in dung:
                i += 1
                moi = nen + "abcdefghijklmnopqrstuvwxyz"[i - 1]
        dung.add(moi)
        r["id"] = moi
        rec = {"id": moi}
        for truong in ("loai", "tac_gia", "nam", "nam_goc", "ten", "noi_dang", "doi", "url"):
            if truong in r:
                rec[truong] = r[truong]
        if chi_the and VIET.search(rec["ten"]):
            bao["Nguồn của thẻ ngộ nhận ghi tên bài bằng lời mô tả tiếng Việt (D2-0 lấy tên thật)"].append(
                f"`{moi}`: {rec['tac_gia']} ({rec['nam']}). {rec['ten']}")
        elif chi_the and rec["loai"] != "sach" and not rec.get("noi_dang"):
            bao["Nguồn của thẻ ngộ nhận không tách được nơi đăng (tên bài lẫn tên tạp chí; D2-0 sửa)"].append(
                f"`{moi}`: {rec['ten']}")
        recs.append(rec)
        trang_cua[moi] = ts
        for mid in mids:
            id_myth[mid] = moi
    muc = "Cùng một nguồn, site cũ ghi khác nhau (giữ cách ghi có DOI, không có thì cách ghi đầu tiên)"
    bao[muc] = sorted({f"`{r['id']}` · {truong}: \"{a}\" / \"{b}\" (`{t}`)" for r, truong, a, b, t in bao.get(muc, [])})
    if not bao[muc]:
        del bao[muc]
    recs.sort(key=lambda r: r["id"])
    return recs, trang_cua, id_myth


def doi_trong_bai(nguon_recs):
    """DOI viết trong thân bài (ngoài mục Nguồn) mà không có trong mục Nguồn của chính trang ấy: in vào báo cáo."""
    doi_nguon = {r["doi"].lower(): r["id"] for r in nguon_recs if r.get("doi")}
    for p in sorted(DOCS.rglob("*.md")):
        t = p.relative_to(DOCS).as_posix()[:-3]
        if t.startswith("sach/") or t == "ngo-nhan/index":  # ngo-nhan/index sinh từ myths.json: nguồn đã tính ở thẻ
            continue
        text = p.read_text(encoding="utf-8")
        than = re.split(r"^## Nguồn[^\n]*$", text, flags=re.M)[0]
        cua_trang = {d.lower() for d in re.findall(r"doi\.org/(10\.\d{4,9}/[^\s)>\]]+)", "\n".join(muc_nguon(text)))}
        for d in sorted({d.rstrip(".,;").lower() for d in re.findall(r"doi\.org/(10\.\d{4,9}/[^\s)>\]]+)", than)}):
            if d not in cua_trang:
                o = f"có ở nguon.yml (`{doi_nguon[d]}`)" if d in doi_nguon else "**không có ở mục Nguồn của trang nào**: D2-0 thêm bản ghi theo Crossref"
                bao["DOI trong thân bài không có ở mục Nguồn của trang"].append(f"`{t}`: {d}, {o}")


# ---------- nghien-cuu.yml ----------
def ten_tac_gia(tac_gia, nam):
    """Tên ngắn của một nghiên cứu theo tác giả: "Cowan (2001)", "Tversky và Kahneman (1974)", "Henrich và cộng sự (2010)"."""
    ho = re.findall(r"(?:^|,\s|&\s)((?:[a-z]{1,3}\s)?[A-ZÀ-ỸĐ][\w'’-]+(?:\s[A-Z][\w'’-]+)?),\s(?:[A-Z]\.[\s-]?)+", tac_gia)
    ten = ho[0] if len(ho) == 1 else f"{ho[0]} và {ho[1]}" if len(ho) == 2 else f"{ho[0]} và cộng sự" if ho else tac_gia
    return f"{ten} ({nam})"


def nghien_cuu(nguon_recs, trang_cua, ten_trang, tang_cua):
    theo_id = {r["id"]: r for r in nguon_recs}
    recs, da_co = [], set()
    for slug, (ho, nam_toi) in THI_NGHIEM.items():
        t = f"thi-nghiem/{slug}"
        goc = [i for i, ts in trang_cua.items() if t in ts
               and any(re.search(rf"\b{h}\b", theo_id[i]["tac_gia"]) for h in ho)
               and isinstance(theo_id[i]["nam"], int) and theo_id[i].get("nam_goc", theo_id[i]["nam"]) <= nam_toi]
        goc.sort(key=lambda i: (theo_id[i].get("nam_goc", theo_id[i]["nam"]), i))
        if not goc:
            bao["Thí nghiệm không tìm thấy nguồn gốc"].append(f"`{t}`")
            continue
        recs.append({"id": slug, "ten": ten_trang[t], "nguon": goc, "trang_nha": t})
        da_co.update(goc)
        bao["Nguồn gốc của 15 thí nghiệm (duyệt ở D2-0)"].append(
            f"`{slug}`: " + "; ".join(f"`{i}` ({theo_id[i]['tac_gia']}, {theo_id[i]['nam']})" for i in goc))
    # Bài báo được dẫn ở từ 3 trang trở lên (không kể trang Ngộ nhận): thêm vào nghien-cuu.yml; trang nhà đề xuất là
    # trang lõi nhắc họ tác giả đầu nhiều nhất trong thân bài (ưu tiên trang Thí nghiệm). D2-0 duyệt.
    for i, ts in sorted(trang_cua.items(), key=lambda x: (-len(x[1]), x[0])):
        ts = [x for x in ts if x != "ngo-nhan/index"]
        if len(ts) < 3 or i in da_co or theo_id[i]["loai"] != "bai-bao":  # sách, sổ tay chẩn đoán không phải nghiên cứu
            continue
        r = theo_id[i]
        ho = r["tac_gia"].split(",")[0].strip()
        dem = {}
        for x in ts:
            f = DOCS / f"{x}.md"
            than = re.split(r"^## Nguồn[^\n]*$", f.read_text(encoding="utf-8"), flags=re.M)[0] if f.exists() else ""
            dem[x] = len(re.findall(re.escape(ho), than))
        loi = [x for x in ts if tang_cua.get(x) == "loi"]
        if not loi:
            bao["Ứng viên không có trang lõi nào để làm trang nhà"].append(f"`{i}`: " + ", ".join(ts))
            continue
        nha = max(loi, key=lambda x: (x.startswith("thi-nghiem/"), dem[x]))
        recs.append({"id": i, "ten": ten_tac_gia(r["tac_gia"], r["nam"]), "nguon": [i], "trang_nha": nha})
        bao["Nghiên cứu nhắc ở từ 3 trang trở lên: trang nhà là đề xuất của script (D2-0 duyệt)"].append(
            f"`{i}` ({r['tac_gia']} {r['nam']}): {len(ts)} trang; trang nhà `{nha}` (họ \"{ho}\" trong thân bài: "
            + ", ".join(f"{x} {dem[x]}" for x in ts) + ")")
    return recs


# ---------- ngo-nhan.yml ----------
def ngo_nhan(id_myth, trang_ids):
    myths = json.loads((DOCS / "assets" / "data" / "myths.json").read_text(encoding="utf-8"))
    recs = []
    for c in myths["cards"]:
        r = {"id": c["id"], "cap": c["level"], "khang_dinh": c["claim"], "nhan": c["verdict"], "giai_thich": c["explain"],
             "nguon": [id_myth[s] for s in c["sources"]]}
        if c.get("page"):
            t = c["page"].strip("/")
            if t not in trang_ids:
                bao["Thẻ ngộ nhận trỏ tới trang không có"].append(f"`{c['id']}`: {c['page']}")
            r["trang"] = t
        recs.append(r)
    return recs, myths.get("checked")


def ten_trang_cu():
    """Tiêu đề trong nav của site cũ (thứ tự như nav), cho tên của nghiên cứu trong nghien-cuu.yml."""
    ten = {}
    nav = False
    for dong in (CU / "mkdocs.yml").read_text(encoding="utf-8").splitlines():
        if re.match(r"^nav:\s*$", dong):
            nav = True
            continue
        if nav and re.match(r"^\S", dong):
            break
        m = re.match(r"^\s*-\s+(.+?):\s+(\S+)\.md\s*$", dong) if nav else None
        if m:
            ten[m.group(2)] = yaml.safe_load(m.group(1)) if m.group(1)[0] in "\"'" else m.group(1)
    return ten


def main():
    ghi_de = "--ghi-de" in sys.argv[1:]
    if not (CU / "mkdocs.yml").exists():
        sys.exit(f"Không thấy {CU}/mkdocs.yml: cần site cũ ở thư mục cạnh repo (../psyche-zero/).")
    if not ghi_de and any((OUT / f).exists() for f in TEP):
        sys.exit("src/data/ đã có dữ liệu: thêm --ghi-de để ghi đè (chỉ trước khi dữ liệu được kiểm định).")
    try:
        commit = subprocess.run(["git", "-C", str(CU), "rev-parse", "--short", "HEAD"], capture_output=True, text=True,
                                check=True).stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        commit = os.environ.get("PSYCHE_ZERO_COMMIT", "")[:7] or "không rõ"
    ax = nap_anh_xa()
    lv = linh_vuc(ax)
    tr = trang(ax)
    trang_ids = {r["id"] for r in tr}
    ng, trang_cua, id_myth = nguon(trang_ids)
    doi_trong_bai(ng)
    nc = nghien_cuu(ng, trang_cua, ten_trang_cu(), {r["id"]: r["tang"] for r in tr})
    nn, ngay_kiem = ngo_nhan(id_myth, trang_ids)
    ghi("linh-vuc.yml", lv, commit, "# 14 lĩnh vực của bản đồ Nền tảng (plans/ben-vung/README.md mục 3). mau: sắc độ màu của lĩnh vực.\n")
    ghi("trang.yml", tr, commit, "# Mọi trang của site: 106 trang cũ (thứ tự như nav cũ) và 15 trang mới (moi: true). Bảng nguồn: plans/lam-lai/anh_xa.py.\n")
    ghi("nguon.yml", ng, commit, "# Nguồn ở mục Nguồn của các trang cũ (trừ sach/*) và của thẻ ngộ nhận, mỗi nguồn một bản ghi.\n")
    ghi("nghien-cuu.yml", nc, commit, "# Hồ sơ nghiên cứu kinh điển: nghiên cứu chính của 15 trang Thí nghiệm, và nghiên cứu được nhắc ở từ 3 trang\n"
        "# trở lên (trang nhà là đề xuất của script, D2-0 duyệt). trang_nha: trang kể chi tiết; nơi khác chỉ tóm một câu.\n")
    ghi("ngo-nhan.yml", nn, commit, f"# 60 thẻ của docs/assets/data/myths.json (site cũ ghi kiểm tra lần cuối {ngay_kiem}). cap: cấp trong bài thử\n"
        "# Bạn nghĩ gì về tâm trí? (bài thử lấy thẻ có cấp nhỏ hơn hay bằng mức đã chọn).\n")
    print(f"# Tách dữ liệu D1.2 (commit {commit})\n")
    print(f"- linh-vuc.yml: {len(lv)}; trang.yml: {len(tr)}; nguon.yml: {len(ng)} "
          f"({sum(1 for r in ng if r.get('doi'))} có DOI); nghien-cuu.yml: {len(nc)}; ngo-nhan.yml: {len(nn)}\n")
    for muc, dong in bao.items():
        print(f"## {muc} ({len(dong)})\n")
        for d in dong:
            print(f"- {d}")
        print()


if __name__ == "__main__":
    main()
