// Import function or library
import { CookieName, UrlGetFakultas, UrlGetProgramStudi, UrlBiodataJalur, TokenHeader } from "../static/js/controller/template.js";
import { getWithHeader } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

let dataJalur;

// Get Fakultas
// Membuat fungsi untuk fetch data fakultas
const setValue = ( res ) =>{
    if (res.data == null){
        return;
    };
    dataJalur = res;
    return
} 

function fetchDataBiodataJalur(){
    getWithHeader(UrlBiodataJalur, TokenHeader, getCookie(CookieName), setValue);
}

fetchDataBiodataJalur();

function fetchDataFakultas() {
    fetch(UrlGetFakultas)
        .then(response => response.json())
        .then(data => {
            populateDropdownFakultas(data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
// Membuat fungsi dropdown jalur pendaftaran
function populateDropdownFakultas(data) {
    const selectDropdown = document.getElementById('selectfak');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Fakultas';
    selectDropdown.appendChild(defaultOption);

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.nama_fakultas;
        option.text = item.nama_fakultas;
        selectDropdown.appendChild(option);
    })
}
fetchDataFakultas();

// Get Program Studi 1
// Membuat fungsi untuk fetch data prodi
function fetchDataProdi1() {
    fetch(UrlGetProgramStudi)
        .then(response => response.json())
        .then(data => {
            populateDropdownProdi1(data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
// Membuat fungsi dropdown jalur pendaftaran
function populateDropdownProdi1(data) {
    const selectDropdown = document.getElementById('selectprog');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Program Studi 1';
    selectDropdown.appendChild(defaultOption);

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.kode_program_studi;
        option.text = item.program_studi;
        selectDropdown.appendChild(option);
    })
}
fetchDataProdi1();

// Get Program Studi 2
// Membuat fungsi untuk fetch data prodi
function fetchDataProdi2() {
    fetch(UrlGetProgramStudi)
        .then(response => response.json())
        .then(data => {
            populateDropdownProdi2(data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
// Membuat fungsi dropdown jalur pendaftaran
function populateDropdownProdi2(data) {
    const selectDropdown = document.getElementById('selectprog2');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Program Studi 2';
    selectDropdown.appendChild(defaultOption);

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.kode_program_studi;
        option.text = item.program_studi;
        selectDropdown.appendChild(option);
    })
}
fetchDataProdi2();

// Untuk POST prodi & fakultas