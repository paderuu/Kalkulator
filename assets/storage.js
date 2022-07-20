const CACHE_KEY = "calculation_history";

function checkForStorage() {
  return typeof (Storage) !== "undefined"
}

//fungsi untuk menyimpan data riwayat kalkulasi
function putHistory(data) {
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];

    } else {
      //JSON.parse() yang mana digunakan untuk mengubah nilai objek dalam bentuk string kembali pada bentuk objek JavaScript
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    //unshift(), fungsi ini digunakan untuk menambah.kan nilai baru pada array yang ditempatkan pada awal index. Fungsi ini juga mengembalikan nilai panjang array setelah ditambahkan dengan nilai baru.
    historyData.unshift(data);

    if (historyData.length > 5) {
      //pop() di atas merupakan fungsi untuk menghapus nilai index terakhir pada array
      historyData.pop();
    }
    //JSON.stringify() digunakan untuk mengubah objek JavaScript ke dalam bentuk String
    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

//fungsi untuk mendapatkan data dari localStorage
function showHistory() {
  return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
}else {
  return [];
}

//fungsi untuk merender data riwayat kalkulasi pada tabel HTML.
function renderHistory() {
  const historyData = showHistory();
  let historyData = document.querySelector("#historyList")

  // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
  historyList.innerHTML = "";

  for (let history of historyData) {
    let row = document.createElement('tr');
    row.innerHTML = "<td>" + history.firstNumber + "</td>";
    row.innerHTML += "<td>" + history.operator + "</td>";
    row.innerHTML += "<td>" + history.secondNumber + "</td>";
    row.innerHTML += "<td>" + history.result + "</td>";


    historyList.appendChild(row);
  }
}

function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
  }

  // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result
  }

  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
