'use strict';
const geo=(lon,lat)=>({x:(lon-92)/28*100,y:(23-lat)/35*100});
const KINGDOMS=[
 {id:'funan',name:'Funan',...geo(105.3,11.1),city:'Vyadhapura',where:'Lembah Sungai Mekong',river:'Mekong',hint:'Cari bahagian hilir Mekong, di utara Teluk Thailand.'},
 {id:'champa',name:'Champa',...geo(108.27,15.78),city:'Indrapura',where:'Selatan dan tengah Vietnam',river:null,hint:'Cari pesisir tengah Vietnam di sebelah timur tanah besar.'},
 {id:'srivijaya',name:'Srivijaya',...geo(104.76,-2.99),city:'Palembang',where:'Lembah Sungai Musi, Sumatera',river:'Musi',hint:'Cari Sumatera di sebelah selatan Selat Melaka.'},
 {id:'angkor',name:'Angkor',...geo(103.97,13.35),city:'Hariharalaya',where:'Lembah Sungai Mekong',river:'Mekong',hint:'Cari kawasan Kemboja, di utara lokasi Funan.'},
 {id:'majapahit',name:'Majapahit',...geo(112.38,-7.55),city:'Kota Trowulan',where:'Lembah Sungai Brantas, Jawa Timur',river:'Brantas',hint:'Cari bahagian timur Pulau Jawa.'},
 {id:'kedah',name:'Kedah Tua',...geo(100.42,5.7),city:'Sungai Mas dan Pangkalan Bujang',where:'Sungai Mas dan Sungai Bujang',river:'Mas dan Bujang',hint:'Cari pantai barat laut Semenanjung Tanah Melayu.'},
 {id:'gangga',name:'Gangga Nagara',...geo(100.7,4.43),city:'Pangkalan',where:'Pantai barat bahagian tengah Tanah Melayu',river:null,hint:'Cari pantai barat Semenanjung, di selatan Kedah Tua.'}
];
const MAP_TASKS=[
 ...KINGDOMS.map(k=>({id:'k_'+k.id,round:0,scope:'main',label:k.name,x:k.x,y:k.y,tip:k.hint,note:k.name+' — '+k.where+'.'})),
 {id:'r_mekong',round:1,scope:'main',label:'Sungai Mekong',...geo(105.97,14.1),tip:'Funan dan Angkor berkait dengan lembah sungai yang sama.',note:'Lembah Mekong dikaitkan dengan Funan dan Angkor.'},
 {id:'r_musi',round:1,scope:'main',label:'Sungai Musi',...geo(104.76,-2.99),tip:'Cari sungai di Sumatera yang dikaitkan dengan Srivijaya.',note:'Srivijaya — Lembah Sungai Musi, Sumatera.'},
 {id:'r_brantas',round:1,scope:'main',label:'Sungai Brantas',...geo(112.35,-7.46),tip:'Cari Jawa Timur, kawasan kerajaan Majapahit.',note:'Majapahit — Lembah Sungai Brantas, Jawa Timur.'},
 {id:'r_mas',round:1,scope:'kedah',label:'Sungai Mas',x:48,y:70,tip:'Cari penanda sungai di bahagian selatan peta kecil.',note:'Kedah Tua: dua lokasi sungai yang perlu diingat ialah Sungai Mas dan Sungai Bujang.'},
 {id:'r_bujang',round:1,scope:'kedah',label:'Sungai Bujang',x:58,y:32,tip:'Cari penanda sungai di bahagian utara peta kecil.',note:'Sungai Bujang ialah lokasi sungai; Pangkalan Bujang ialah pusat kerajaan.'},
 ...KINGDOMS.filter(k=>k.id!=='kedah').map(k=>({id:'c_'+k.id,round:2,scope:'main',label:k.city,x:k.x,y:k.y,tip:'Pusat kerajaan '+k.name+'.',note:k.name+' — pusat kerajaan '+k.city+'.'})),
 {id:'c_mas',round:2,scope:'kedah',label:'Sungai Mas',x:48,y:70,tip:'Pusat selatan Kedah Tua mempunyai nama yang sama dengan sungainya.',note:'Sungai Mas dan Pangkalan Bujang ialah pusat kerajaan Kedah Tua.'},
 {id:'c_bujang',round:2,scope:'kedah',label:'Pangkalan Bujang',x:58,y:32,tip:'Nama pusat ini bermula dengan Pangkalan.',note:'Bezakan Sungai Bujang (sungai) dengan Pangkalan Bujang (pusat kerajaan).'}
];
const CHARTERS=[
 {id:'doc_funan',target:'funan',title:'RAJA KECIL',body:'Putera raja mengetuai tujuh wilayah.',fact:'Dalam Funan, ketua wilayah terdiri daripada putera raja bergelar Raja Kecil.'},
 {id:'doc_srivijaya',target:'srivijaya',title:'KEDATUAN',body:'Wilayah ditadbir Datu berketurunan raja.',fact:'Srivijaya membezakan Kedatuan daripada Pradatuan.'},
 {id:'doc_angkor',target:'angkor',title:'DEWARAJA',body:'Gelaran raja yang dikaitkan dengan dewa.',fact:'Dewaraja ialah gelaran raja Angkor.'},
 {id:'doc_majapahit',target:'majapahit',title:'SAPTA PRABU',body:'Majlis Penasihat Diraja daripada kerabat diraja.',fact:'Sapta Prabu membantu raja Majapahit.'},
 {id:'doc_kedah',target:'kedah',title:'KETUA PENTADBIRAN',body:'Mengurus perdagangan dan keagamaan dalam pentadbiran yang mudah.',fact:'Kedah Tua mempunyai ketua yang mengurus perdagangan dan keagamaan.'}
];
const GOODS=[
 {id:'rice',name:'Padi',category:'farm',icon:'rice',note:'Padi ialah hasil pertanian.'},
 {id:'rattan',name:'Rotan',category:'forest',icon:'rattan',note:'Rotan dikumpulkan sebagai hasil hutan.'},
 {id:'pearl',name:'Mutiara',category:'sea',icon:'pearl',note:'Mutiara ialah hasil laut.'},
 {id:'tin',name:'Bijih timah',category:'mine',icon:'tin',note:'Bijih timah diperoleh melalui perlombongan.'},
 {id:'pot',name:'Tembikar',category:'craft',icon:'pot',note:'Tembikar ialah hasil pembuatan.'}
];
const CATEGORIES=[{id:'farm',name:'Pertanian'},{id:'forest',name:'Hasil hutan'},{id:'sea',name:'Hasil laut'},{id:'mine',name:'Perlombongan'},{id:'craft',name:'Pembuatan'}];
const ANSWER_FIELDS=[
 {id:'a_funan',section:'a',kingdom:'Funan',prompt:'Isyarat dari Funan: bekalan perlu dihantar melalui lembah sungai manakah?',model:'Lembah Sungai Mekong'},
 {id:'a_majapahit',section:'a',kingdom:'Majapahit',prompt:'Kapal bekalan menuju Majapahit di Jawa Timur. Namakan sungai yang perlu dicari pada atlas.',model:'Sungai Brantas'},
 {id:'a_srivijaya',section:'a',kingdom:'Srivijaya',prompt:'Ejen berada di Palembang. Apakah sungai yang berkait dengan lokasi kerajaan Srivijaya?',model:'Sungai Musi'},
 {id:'b_champa',section:'b',kingdom:'Champa',prompt:'Dokumen untuk Champa kehilangan alamat pusat kerajaan. Lengkapkan alamat itu.',model:'Indrapura'},
 {id:'b_angkor',section:'b',kingdom:'Angkor',prompt:'Fail pusat Angkor tersalah label sebagai Palembang. Tulis nama pusat yang betul.',model:'Hariharalaya'},
 {id:'b_gangga',section:'b',kingdom:'Gangga Nagara',prompt:'Utusan Gangga Nagara perlu kembali ke pusat kerajaannya. Apakah nama destinasi tersebut?',model:'Pangkalan'}
];
const EXAMPLE_ESSAY='Lembah sungai membekalkan air untuk kegunaan harian dan pengairan. Tanah yang subur sesuai untuk pertanian. Sungai memudahkan pengangkutan dan perhubungan. Sungai juga memudahkan kegiatan perdagangan.';
