
fetch('data.json').then(r=>r.json()).then(d=>{
window.data=d;document.getElementById('regionSelect').innerHTML='<option>시도 선택</option>'+[...new Set(d.map(i=>i.시도명))].map(r=>`<option>{r}</option>`).join('');});
function updateDistricts(){
let r=document.getElementById('regionSelect').value;
document.getElementById('districtSelect').innerHTML='<option>시군구 선택</option>'+[...new Set(window.data.filter(i=>i.시도명==r).map(i=>i.시군구명))].map(d=>`<option>{d}</option>`).join('');
}
function search(){
let r=document.getElementById('regionSelect').value,d=document.getElementById('districtSelect').value,res=document.getElementById('result');
res.innerHTML='';window.data.filter(i=>i.시도명==r&&i.시군구명==d).forEach(i=>{
res.innerHTML+=`<p>{i.시도명} {i.시군구명} - 생활:{i.생활쓰레기배출방법}, 음식물:{i.음식물쓰레기배출방법}, 재활용:{i.재활용품배출방법}</p>`;});
}
