import { UrlGetKota, UrlGetPekerjaan, UrlGetProvinsi, UrlPostDataOrtu, UrlPostDatadiri,UrlGetDataPendaftar,UrlGetBiodataByHash } from "../controller/template.js";
import { getValue,setValue, setInnerText } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.2/croot.js";
import { token } from "../controller/cookies.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { get,getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";


var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

// Get Data Cookies
// Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetDataPendaftar,"login",token,renderDataPendaftar);
function renderDataPendaftar(result){
  if (result.success){
    setInnerText('nama_mhs_span', result.data.nama_mhs);
  }else{
    window.location.replace("https://pmb.ulbi.ac.id/");
  }
}

//untuk alamat sama
window.onChangeSetAlamat=onChangeSetAlamat;

function onChangeSetAlamat(checkbox) {
    if(checkbox.checked){
        console.log("udah cek");
        let urlgdt=UrlGetBiodataByHash+getCookie("id_hash");
        getWithHeader(urlgdt,"login",token,renderAlamatOrtu);
        
    }else{
        console.log("ilangcek");
        setValue("alamatortu","");
    }
    
}
function renderAlamatOrtu(res) {
    console.log(res)
    if (res.success){
        let alamatlengkap = res.data.alamat+" "+res.data.kelurahan+" "+res.data.kecamatan+" "+res.data.kota+" "+res.data.provinsi;
        console.log(alamatlengkap);
        setValue("alamatortu",alamatlengkap);
    }
}

// Untuk POST prodi & fakultas
// Membuat fungsi untuk mengirimkan data pilih prodi ke API
function SubmitBiodataOrtu() {
    const nama_ayah_kandung = getValue('ayahkandung');
    const hp_ayah_kandung = getValue('hpayah');
    const nama_ibu_kandung = getValue('ibukandung');
    const hp_ibu_kandung = getValue('hpibu');
    const pekerjaan_orang_tua_wali = getValue('selectpekerjaan');
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
                text : 'Biodata orang tua berhasil disubmit.',
                showConfirmButton : false,
                timer : 1500
            }).then(() => {
                window.location.href = 'biodatasekolah.html';
            });
        } else {
            Swal.fire({
                icon : 'error',
                title : 'Oops...',
                text : 'Biodata orang tua gagal disubmit.'
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
    const ayahkandung = getValue('ayahkandung');
    const ibukandung = getValue('ibukandung');
    const nohpayah = getValue('hpayah');
    const nohpibu = getValue('hpibu');
    const pekerjaanortu = getValue('selectpekerjaan');
    const penghasilanortu = getValue('selectpenghasilan');
    const sumberdana = getValue('selectsumberdana');
    const alamatortu = getValue('alamatortu');

    if (!ayahkandung || !ibukandung || !nohpayah || !nohpibu || !pekerjaanortu || !penghasilanortu || !sumberdana || !alamatortu ) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Semua field harus diisi!',
        });
        return;
    }
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

// Get Pekerjaan Orang Tua
function fetchDataPekerjaan() {
    get(UrlGetPekerjaan, populateDropdownPekerjaan);
}
// Membuat fungsi dropdown jalur pendaftaran
function populateDropdownPekerjaan(data) {
    const selectDropdown = document.getElementById('selectpekerjaan');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Pekerjaan';
    selectDropdown.appendChild(defaultOption);

    data.data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.nama_pekerjaan;
        option.text = item.nama_pekerjaan;
        selectDropdown.appendChild(option);
    })
}
fetchDataPekerjaan();
console.log(fetchDataPekerjaan);

