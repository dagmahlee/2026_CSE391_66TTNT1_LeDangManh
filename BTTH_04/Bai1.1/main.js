const nameInput = document.getElementById("hoTen");
const scoreInput = document.getElementById("diem");
const addButton = document.getElementById("btnThem");
const tableBody = document.querySelector("#bangDiem tbody");
const statsDiv = document.getElementById("thongKe");

scoreInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addButton.click();
    }
});
function diemTBSV() {
    const cacHang = tableBody.querySelectorAll("tr"); 
    const tongSV = cacHang.length;
    let tongDiem = 0;
    if (tongSV === 0) {
        statsDiv.innerHTML = `Tổng số sinh viên: <strong>0</strong> | Điểm trung bình: <strong>0.00</strong>`;
        return;
    }
    cacHang.forEach((hang, index) => {
        hang.children[0].textContent = index + 1;
        const diem = parseFloat(hang.children[2].textContent);
        tongDiem += diem;
    });
    const diemTB = (tongDiem / tongSV).toFixed(2);
    statsDiv.innerHTML = `Tổng số sinh viên: <strong>${tongSV}</strong> | Điểm trung bình: <strong>${diemTB}</strong>`;
}
function tinhXepLoai(diem) {
    if (diem >= 8.5) return "Giỏi";
    if (diem >= 7.0) return "Khá";
    if (diem >= 5.0) return "Trung bình";
    return "Yếu";
}
function xuLyThem() {
    const ten = nameInput.value.trim();
    const diemStr = scoreInput.value.trim();
    const diemSo = Number(diemStr);
    if (ten === "" || diemStr === "" || diemSo < 0 || diemSo > 10 || isNaN(diemSo)) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (từ 0 đến 10)!");
        return;
    }
    const newRow = document.createElement("tr");
    if (diemSo < 5.0) {
        newRow.classList.add("diem-yeu");
    }
    const sttMoi = tableBody.children.length + 1;
    newRow.innerHTML = `
    <td>${sttMoi}</td>  <td>${ten}</td>
    <td>${diemSo}</td>
    <td>${tinhXepLoai(diemSo)}</td>
    <td><button class="btn-xoa">Xóa</button></td>
`;
tableBody.appendChild(newRow);
    tableBody.appendChild(newRow);
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
    diemTBSV();
}
addButton.addEventListener("click", xuLyThem);
scoreInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        xuLyThem();
    }
});
tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-xoa")) {
        const hangCanXoa = event.target.closest("tr");
        hangCanXoa.remove(); 
        diemTBSV();
    }
});