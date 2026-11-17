# CI: ghim máy chạy ubuntu-24.04 (them/ci-ubuntu-2404, 17/11/2026)

Lần chạy `test.yml` của `them/cho-chuyen-gia` hỏng ở job WebKit: máy chạy là ảnh `ubuntu-26.04` (GitHub đổi `ubuntu-latest`), WebKit của Playwright lấy từ bộ đệm (dựng cho 24.04) báo `libicudata.so.74: cannot open shared object file`. Không phải lỗi mã.

- `.github/workflows/test.yml`, `deploy.yml`, `ho-tro-quarterly.yml`: `runs-on: ubuntu-24.04` thay `ubuntu-latest`, để ảnh máy chỉ đổi khi ta đổi (như phiên bản gói ghim chính xác). Lên 26.04 thì làm một nhánh riêng, sau khi Playwright hỗ trợ.
- `.github/actions/kiem-thu/action.yml`: khóa bộ đệm trình duyệt thêm `ImageOS`, để đổi ảnh máy thì cài lại trình duyệt thay vì dùng bản dựng cho Ubuntu khác.

Mức lớn (workflow deploy), nhưng chỉ đổi nhãn máy chạy và khóa bộ đệm; kiểm bằng chính lần chạy CI của nhánh. Model: Opus 5.5.
