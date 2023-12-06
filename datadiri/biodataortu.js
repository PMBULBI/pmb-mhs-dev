import { UrlGetKota, UrlGetPekerjaan, UrlGetProvinsi, UrlPostDataOrtu, UrlPostDatadiri } from "../static/js/controller/template.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { CihuyPost } from "https://c-craftjs.github.io/api/api.js";
import { token } from "../static/js/controller/cookies.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

// Get Data untuk Navbar
document.addEventListener("DOMContentLoaded", function() {
    // Ambil nilai dari cookie dengan nama 'namaMhs'
    var namaMhsCookie = getCookieData('namaMhs');
    // Cek apakah cookie ada
    if (namaMhsCookie) {
        // Set nilai cookie ke dalam elemen dengan ID 'nama_mhs_span'
        document.getElementById('nama_mhs_span').innerText = namaMhsCookie;
    }
});
// Fungsi untuk mendapatkan nilai cookie berdasarkan nama
function getCookieData(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Get Data Pekerjaan Orang Tua
// Buat variabel untuk get id element
const pekerjaanSuggestion = getValue('pekerjaan-suggestions');
const inputPekerjaan = getValue('pekerjaan');
const pekerjaanInput = document.getElementById("pekerjaan-biodata");

document.addEventListener('click', function (event) {
    const dropdown = getValue('pekerjaan-suggestions');

    if (!dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});
// Buat listener untuk suggestions
inputPekerjaan.addEventListener("input", async () => {
    const pekerjaanValue = inputPekerjaan.value;
    const body = {
        nama_pekerjaan: pekerjaanValue
    };
    try {
        const inputValue = inputPekerjaan.value.trim();
        if (inputValue === '') {
            pekerjaanSuggestion.innerHTML = '';
            pekerjaanSuggestion.style.display = 'none';
        } else if (inputValue.length < 3) {
            pekerjaanSuggestion.textContent = data.status;
            pekerjaanSuggestion.style.display = 'block';
        } else {
            const data = await CihuyPost(UrlGetPekerjaan, body);
            console.log("Data yang diterima setelah POST : ", data);
            if (data.success == false) {
                pekerjaanSuggestion.textContent = '';
                const pekerjaanNames = data.data.map(pekerjaan => pekerjaan.nama_pekerjaan);
                pekerjaanSuggestion.innerHTML = "";
                pekerjaanNames.forEach(pekerjaanNames => {
                    const elementPekerjaan = document.createElement("div");
                    elementPekerjaan.className = 'pekerjaan';
                    elementPekerjaan.textContent = pekerjaanNames;
                    elementPekerjaan.addEventListener("click", () => {
                        pekerjaanInput.value = pekerjaanNames;
                        pekerjaanSuggestion.innerHTML = "";
                    })
                    pekerjaanSuggestion.appendChild(elementPekerjaan);
                    if (pekerjaanNames.length > 0) {
                        pekerjaanSuggestion.style.display = "block";
                    } else {
                        pekerjaanSuggestion.style.display = "none";
                    }
                })
                pekerjaanSuggestion.classList.add('dropdown');
            }
        }
    } catch (error) {
        console.error("Terjadi kesalahan saat melakukan POST:", error);
    }
})

// Untuk POST prodi & fakultas
// Membuat fungsi untuk mengirimkan data pilih prodi ke API
function SubmitBiodataOrtu() {
    const nama_ayah_kandung = getValue('ayahkandung');
    const hp_ayah_kandung = getValue('hpayah');
    const nama_ibu_kandung = getValue('ibukandung');
    const hp_ibu_kandung = getValue('hpibu');
    const pekerjaan_orang_tua_wali = getValue('pekerjaanortu');
    const alamat_orang_tua_wali = getValue('alamatortu');
    const penghasilan_orang_tua_wali = getValue('selectpenghasilan');
    const sumber_dana = getValue('selectsumberdana');

    const data = {
        "nama_ayah_kandung": nama_ayah_kandung,
        "hp_ayah_kandung": hp_ayah_kandung,
        "nama_ibu_kandung": nama_ibu_kandung,
        "hp_ibu_kandung": hp_ibu_kandung,
        "pekerjaan_orang_tua_wali": pekerjaan_orang_tua_wali,
        "alamat_orang_tua_wali": alamat_orang_tua_wali,
        "penghasilan_orang_tua_wali": penghasilan_orang_tua_wali,
        "sumber_dana": sumber_dana,
        };
    
    // Now 'data' is a constant containing the given JSON object
    console.log(data);
    

    fetch(UrlPostDataOrtu, {
        method : "POST",
        headers : header,
        body : JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon : 'success',
                title : 'Sukses!',
                text : 'Program studi berhasil disubmit.',
                showConfirmButton : false,
                timer : 1500
            }).then(() => {
                window.location.href = 'biodatasekolah.html';
            });
        } else {
            Swal.fire({
                icon : 'error',
                title : 'Oops...',
                text : 'Jalur pendaftaran gagal disubmit.'
            })
        }
    })
    .catch(error => {
        console.error("Error saat melakukan POST Data : ", error);
    });
}

// Event listener untuk tombol "Submit"
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    // const provinsi = getValue('selectprovince');
    // const religion = getValue('selectreligion');
    // const kotakab = getValue('selectkotakab');

    // if (!provinsi || !religion || !kotakab ) {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Oops...',
    //         text: 'Semua field harus diisi!',
    //     });
    //     return;
    // }
    // Add additional validation if needed
    Swal.fire({
        title: 'Submit Jalur Pendaftaran?',
        text: 'Apakah anda yakin ingin submit jalur pendaftaran?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            SubmitBiodataOrtu();
        }
    });
});