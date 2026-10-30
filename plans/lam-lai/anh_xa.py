#!/usr/bin/env python3
"""Sinh plans/lam-lai/anh-xa.md: mỗi trang của site cũ (Psyche Zero) thuộc nhóm menu, tầng, lĩnh vực, đợt, lô nào ở
site mới (Psyche); cộng các trang mới không có ở site cũ.

Chạy từ thư mục gốc của repo:  python3 plans/lam-lai/anh_xa.py > plans/lam-lai/anh-xa.md
Chỉ đọc. Đọc nav trong ../psyche-zero/mkdocs.yml (thư mục cạnh repo; không sửa gì ở đó). Không cần gói ngoài.
Tầng và lĩnh vực theo bản đồ Nền tảng ở plans/ben-vung/README.md mục 3; đợt, lô theo plans/lam-lai/README.md.
Đổi bản đồ hay chia lô thì sửa các bảng dưới đây rồi sinh lại, không sửa tay anh-xa.md.
"""
import collections
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
CU = ROOT.parent / "psyche-zero"

# 14 lĩnh vực nền tảng (plans/ben-vung/README.md mục 3). Mã dùng cho trang lĩnh vực mới /nen-tang/<mã>/ và trường
# linh_vuc của trang (D1.2).
LINH_VUC = {
    "phuong-phap": "Tâm lý học là gì, phương pháp",
    "co-so-sinh-hoc": "Cơ sở sinh học",
    "tri-giac-chu-y": "Cảm giác, tri giác, chú ý",
    "y-thuc-giac-ngu": "Ý thức và giấc ngủ",
    "hoc-tap": "Học tập",
    "tri-nho": "Trí nhớ",
    "tu-duy-tri-tue": "Tư duy, ngôn ngữ, trí tuệ",
    "phat-trien": "Phát triển suốt đời",
    "cam-xuc-dong-luc": "Cảm xúc và động lực",
    "tinh-cach": "Tính cách",
    "tam-ly-xa-hoi": "Tâm lý xã hội",
    "cang-thang-suc-khoe": "Căng thẳng và sức khỏe",
    "hanh-phuc": "Hạnh phúc",
    "suc-khoe-tam-than": "Sức khỏe tâm thần, trị liệu",
}

# Bài Khám phá xếp Mở rộng (12 bài): bằng chứng còn biến động nhanh, hay chủ đề ứng dụng, thời sự.
MO_RONG = {
    "kham-pha/tri-nho/phong-cach-hoc", "kham-pha/chu-y-tri-giac/da-nhiem-so", "kham-pha/tu-duy/dunning-kruger",
    "kham-pha/tinh-cach/mbti", "kham-pha/co-so-sinh-hoc/dopamine", "kham-pha/co-so-sinh-hoc/the-duc-nao",
    "kham-pha/cam-xuc-dong-luc/tri-tue-cam-xuc", "kham-pha/cang-thang-giac-ngu/stress-co-hai",
    "kham-pha/phat-trien/mang-xa-hoi-teen", "kham-pha/phat-trien/tam-ly-hoc-duong",
    "kham-pha/hanh-phuc/tien-va-hanh-phuc", "kham-pha/hanh-phuc/dong-chay-flow",
}

# Nhóm Khám phá của site cũ -> lĩnh vực nền tảng. Căng thẳng và giấc ngủ tách đôi: giấc ngủ, giấc mơ vào Ý thức và giấc
# ngủ; stress vào Căng thẳng và sức khỏe. Trí tuệ nhập vào Tư duy.
NHOM_KP = {
    "tri-nho": "tri-nho", "tam-ly-xa-hoi": "tam-ly-xa-hoi", "chu-y-tri-giac": "tri-giac-chu-y", "tu-duy": "tu-duy-tri-tue",
    "tinh-cach": "tinh-cach", "co-so-sinh-hoc": "co-so-sinh-hoc", "cam-xuc-dong-luc": "cam-xuc-dong-luc",
    "phat-trien": "phat-trien", "hanh-phuc": "hanh-phuc", "tri-tue": "tu-duy-tri-tue",
    "suc-khoe-tam-than": "suc-khoe-tam-than",
}
GIAC_NGU = {"kham-pha/cang-thang-giac-ngu/ngu-va-tri-nho", "kham-pha/cang-thang-giac-ngu/giac-mo"}

THI_NGHIEM = {
    "milgram": "tam-ly-xa-hoi", "asch": "tam-ly-xa-hoi", "darley-latane": "tam-ly-xa-hoi", "zimbardo": "tam-ly-xa-hoi",
    "robbers-cave": "tam-ly-xa-hoi", "pygmalion": "tam-ly-xa-hoi", "khi-dot-vo-hinh": "tri-giac-chu-y",
    "pavlov": "hoc-tap", "skinner": "hoc-tap", "little-albert": "hoc-tap", "seligman": "hoc-tap", "bandura": "hoc-tap",
    "harlow": "phat-trien", "keo-deo": "phat-trien", "schachter-singer": "cam-xuc-dong-luc",
}
CONG_CU = {
    "stroop": "tri-giac-chu-y", "do-dai-tri-nho": "tri-nho", "ao-giac-thi-giac": "tri-giac-chu-y",
    "mu-thay-doi": "tri-giac-chu-y", "ebbinghaus": "tri-giac-chu-y", "tri-nho-sai": "tri-nho", "wason-246": "tu-duy-tri-tue",
    "linda": "tu-duy-tri-tue", "big-five-mini": "tinh-cach", "neo-gia": "tu-duy-tri-tue", "tri-nho-tu": "tri-nho",
}

# Đợt, lô: thứ tự làm theo plans/lam-lai/README.md (Tiến độ). Mỗi lô tối đa khoảng 8 trang.
LO = {
    "D2-L1": ["index", "bat-dau/index", "bat-dau/doc-nhan-chac-chan", "ho-tro/index", "kham-pha/index"],
    "D3-L1": ["thi-nghiem/index"] + [f"thi-nghiem/{x}" for x in
              ["milgram", "asch", "darley-latane", "zimbardo", "robbers-cave", "pygmalion", "khi-dot-vo-hinh"]],
    "D3-L2": [f"thi-nghiem/{x}" for x in
              ["pavlov", "skinner", "little-albert", "seligman", "bandura", "harlow", "keo-deo", "schachter-singer"]],
    "D4-L1": ["bang-chung/index"] + [f"bang-chung/{x}" for x in
              ["tuong-quan-nhan-qua", "thi-nghiem-doi-chung", "do-lon-hieu-ung", "mau-va-chon-mau", "p-value",
               "khung-hoang-tai-lap"]],
    "D4-L2": [f"bang-chung/{x}" for x in
              ["phan-tich-tong-hop", "thong-ke-mo-ta", "do-luong", "co-mau-suc-manh", "doc-bai-bao-khoa-hoc",
               "dao-duc-nghien-cuu"]],
    # Đợt 5: 27 bài đã kiểm ở G1-L01 đến L04 của site cũ (../psyche-zero/plans/bao-cao/g1-l0*.md)
    "D5-L1": ["@kham-pha/tri-nho", "@kham-pha/tri-tue"],
    "D5-L2": ["@kham-pha/tu-duy"],
    "D5-L3": ["@kham-pha/chu-y-tri-giac", "@kham-pha/tinh-cach"],
    "D5-L4": ["@kham-pha/tam-ly-xa-hoi", "@kham-pha/cam-xuc-dong-luc"],
    "D6-L1": ["@kham-pha/cang-thang-giac-ngu", "@kham-pha/hanh-phuc"],
    "D6-L2": ["@kham-pha/co-so-sinh-hoc"],
    "D6-L3": ["@kham-pha/phat-trien"],
    "D7-L1": ["@kham-pha/suc-khoe-tam-than"],
    "D8-L1": ["trai-nghiem/index"] + [f"trai-nghiem/{x}" for x in
              ["stroop", "do-dai-tri-nho", "ao-giac-thi-giac", "mu-thay-doi", "ebbinghaus"]],
    "D8-L2": [f"trai-nghiem/{x}" for x in ["tri-nho-sai", "wason-246", "linda", "big-five-mini", "neo-gia", "tri-nho-tu"]],
    "D8-L3": ["ngo-nhan/index", "bat-dau/ban-nghi-gi"],
    "D8-L4": ["sach/index", "sach/tom-tat", "them/gioi-thieu", "them/du-lieu-cua-toi", "them/nhat-ky",
              "them/nghien-cuu-moi", "them/cap-nhat"],
}
TEN_DOT = {
    2: "Dữ liệu dùng chung và lối vào", 3: "Thí nghiệm kinh điển", 4: "Hiểu bằng chứng",
    5: "Nền tảng phần 1 (27 bài đã kiểm ở G1-L01–L04)", 6: "Nền tảng phần 2", 7: "Sức khỏe tâm thần",
    8: "Công cụ, ngộ nhận, sách in, Thêm",
}

# Trang mới, không có ở site cũ (D2-L1): trang lĩnh vực sinh từ dữ liệu, trang giải thích cách kiểm chứng.
TRANG_MOI = [("bat-dau/cach-kiem-chung", "Bắt đầu", "khung", "phuong-phap", "D2-L1",
              "Cách Psyche kiểm chứng: ba tầng, hồ sơ, khóa, thước đo nhãn")] + [
    (f"nen-tang/{k}", "Nền tảng", "khung", k, "D2-L1", f"Trang lĩnh vực: {v}; danh sách bài sinh từ dữ liệu")
    for k, v in LINH_VUC.items()]


def nav_pages():
    """Trang trong nav của site cũ, theo thứ tự (bỏ .md). Đọc bằng biểu thức chính quy: mkdocs.yml có thẻ !!python/name
    mà trình đọc YAML an toàn không đọc được; mỗi dòng nav kết thúc bằng đường dẫn .md."""
    nav, ra = False, []
    for dong in (CU / "mkdocs.yml").read_text(encoding="utf-8").splitlines():
        if re.match(r"^nav:\s*$", dong):
            nav = True
            continue
        if nav and re.match(r"^\S", dong):
            break
        m = re.search(r"(\S+)\.md\"?\s*$", dong) if nav else None
        if m:
            ra.append(m.group(1).strip("\"'"))
    return ra


def phan_loai(t):
    """(nhóm menu, tầng, lĩnh vực, ghi chú) của một trang cũ."""
    phan = t.split("/")
    if t == "index":
        return "Trang chủ", "khung", "", "Trang chủ mới: danh sách bài sinh từ dữ liệu, chỉ trang đã khóa"
    if phan[0] == "bat-dau":
        if t == "bat-dau/doc-nhan-chac-chan":
            return "Bắt đầu", "loi", "phuong-phap", "Định nghĩa bốn nhãn: thêm thước đo nhãn (ben-vung mục 5.4)"
        if t == "bat-dau/ban-nghi-gi":
            return "Bắt đầu", "loi", "phuong-phap", "20 khẳng định đúng, sai, tranh cãi: kiểm cùng thẻ ngộ nhận"
        return "Bắt đầu", "khung", "", ""
    if phan[0] == "kham-pha":
        if t == "kham-pha/index":
            return "Nền tảng", "khung", "", "Mục lục 14 lĩnh vực, sinh từ dữ liệu"
        lv = "y-thuc-giac-ngu" if t in GIAC_NGU else (
            "cang-thang-suc-khoe" if phan[1] == "cang-thang-giac-ngu" else NHOM_KP[phan[1]])
        if t in MO_RONG:
            return "Chủ đề mở rộng", "mo-rong", lv, "hạn xem lại 12–18 tháng"
        ghi = "khóa sau khi chuyên gia đọc" if phan[1] == "suc-khoe-tam-than" else ""
        return "Nền tảng", "loi", lv, ghi
    if phan[0] == "thi-nghiem":
        if t == "thi-nghiem/index":
            return "Thí nghiệm kinh điển", "khung", "", ""
        return "Thí nghiệm kinh điển", "loi", THI_NGHIEM[phan[1]], "trang nhà của nghiên cứu"
    if phan[0] == "bang-chung":
        if t == "bang-chung/index":
            return "Hiểu bằng chứng", "khung", "phuong-phap", ""
        return "Hiểu bằng chứng", "loi", "phuong-phap", "chuẩn hóa theo khuôn 7 mục, có câu hỏi"
    if phan[0] == "trai-nghiem":
        if t == "trai-nghiem/index":
            return "Tự trải nghiệm", "khung", "", ""
        return "Tự trải nghiệm", "cong-cu", CONG_CU[phan[1]], "số liệu nghiên cứu trong mã đưa vào hồ sơ"
    if phan[0] == "ngo-nhan":
        return "Ngộ nhận", "du-lieu", "", "trang sinh từ 60 thẻ trong src/data/; khóa từng thẻ"
    if phan[0] == "sach":
        return "Thêm", "khung", "", "sinh lúc build từ trang đã khóa, không commit file sinh"
    if phan[0] == "ho-tro":
        return "Hỗ trợ", "co-han", "suc-khoe-tam-than", "số liên hệ kiểm lại mỗi quý"
    if phan[0] == "them":
        if t in ("them/nghien-cuu-moi", "them/cap-nhat"):
            return "Thêm", "cap-nhat", "", "dòng cập nhật: chỉ thêm, có ngày"
        if t in ("them/du-lieu-cua-toi", "them/nhat-ky"):
            return "Thêm", "cong-cu", "", "dữ liệu trong trình duyệt, khóa psyche-zero"
        return "Thêm", "khung", "", ""
    raise SystemExit(f"trang chưa phân loại: {t}")


def main():
    if not (CU / "mkdocs.yml").exists():
        sys.exit(f"Không thấy {CU}/mkdocs.yml: cần site cũ ở thư mục cạnh repo (../psyche-zero/).")
    trang = nav_pages()
    lo_cua = {}
    for lo, ds in LO.items():
        for x in ds:
            ds2 = [t for t in trang if t.startswith(x[1:] + "/")] if x.startswith("@") else [x]
            for t in ds2:
                if t in lo_cua:
                    sys.exit(f"{t} nằm ở hai lô: {lo_cua[t]}, {lo}")
                lo_cua[t] = lo
    thieu = [t for t in trang if t not in lo_cua]
    thua = [t for t in lo_cua if t not in trang]
    if thieu or thua:
        sys.exit(f"lô chưa khớp nav: thiếu {thieu}, thừa {thua}")

    dong = []
    for t in trang:
        nhom, tang, lv, ghi = phan_loai(t)
        dong.append((lo_cua[t], t, nhom, tang, lv, ghi, False))
    for t, nhom, tang, lv, lo, ghi in TRANG_MOI:
        dong.append((lo, t, nhom, tang, lv, ghi, True))

    p = print
    p("# Ánh xạ trang: site cũ sang site mới")
    p()
    p("Sinh bằng `python3 plans/lam-lai/anh_xa.py > plans/lam-lai/anh-xa.md` (đọc nav của `../psyche-zero/mkdocs.yml`). "
      "Đừng sửa tay: sửa bảng trong `anh_xa.py` rồi sinh lại.")
    p()
    p("- **Địa chỉ giữ nguyên** (luật 4): `../psyche-zero/docs/<trang>.md` thành `src/content/docs/<trang>.md`; "
      "`/psyche-zero/<trang>/` thành `/psyche/<trang>/`.")
    p("- **Tầng**: `loi` (Nền tảng: kiểm V3, khóa), `mo-rong` (V2 trở lên, có hạn xem lại), `cong-cu` (công cụ: số liệu "
      "trong mã vào hồ sơ), `co-han` (thông tin có hạn, như số liên hệ), `cap-nhat` (dòng cập nhật: chỉ thêm), `du-lieu` "
      "(trang sinh từ dữ liệu đã khóa từng bản ghi), `khung` (mục lục, trang sinh, trang về site). Định nghĩa: "
      "`plans/ben-vung/README.md`.")
    p("- **Lĩnh vực**: 14 lĩnh vực nền tảng; trang lĩnh vực mới ở `/psyche/nen-tang/<mã>/` liệt kê bài theo trường "
      "`linh_vuc`.")
    p()
    dem_tang = collections.Counter(d[3] for d in dong if not d[6])
    dem_lo = collections.Counter(d[0] for d in dong if not d[6])
    p(f"Site cũ có **{len(trang)} trang** trong nav; site mới thêm **{len(TRANG_MOI)} trang mới**. Theo tầng (trang cũ): "
      + ", ".join(f"{k} {v}" for k, v in sorted(dem_tang.items(), key=lambda x: -x[1])) + ".")
    p()
    p("| Đợt | Nội dung | Lô | Trang cũ |")
    p("|---|---|---|---|")
    for dot in sorted({int(lo[1]) for lo in LO}):
        cac_lo = [lo for lo in LO if int(lo[1]) == dot]
        p(f"| {dot} | {TEN_DOT[dot]} | {', '.join(cac_lo)} | {sum(dem_lo[lo] for lo in cac_lo)} |")
    p()
    p("Lĩnh vực của trang lõi (đếm cả trang Thí nghiệm, Hiểu bằng chứng):")
    p()
    dem_lv = collections.Counter(d[4] for d in dong if not d[6] and d[3] == "loi")
    p("| Lĩnh vực | Mã | Trang lõi |")
    p("|---|---|---|")
    for k, v in LINH_VUC.items():
        p(f"| {v} | `{k}` | {dem_lv.get(k, 0)} |")
    p()
    for lo in LO:
        ds = [d for d in dong if d[0] == lo]
        p(f"## {lo} ({len(ds)} trang)")
        p()
        p("| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |")
        p("|---|---|---|---|---|")
        for _, t, nhom, tang, lv, ghi, moi in ds:
            ten = f"`{t}` (mới)" if moi else f"`{t}`"
            p(f"| {ten} | {nhom} | {tang} | {lv} | {ghi} |")
        p()


if __name__ == "__main__":
    main()
