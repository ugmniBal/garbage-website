// ⚠️ 실제로는 data.json 등에서 fetch로 불러와야 함
const data = []; // 여기에 JSON 데이터 직접 넣거나 fetch 사용

window.onload = () => {
  const regionSelect = document.getElementById("regionSelect");
  const uniqueRegions = [...new Set(data.map(d => d.시도명))];
  uniqueRegions.forEach(r => {
    const opt = document.createElement("option");
    opt.value = r;
    opt.textContent = r;
    regionSelect.appendChild(opt);
  });
};

function updateDistricts() {
  const region = document.getElementById("regionSelect").value;
  const districtSelect = document.getElementById("districtSelect");
  districtSelect.innerHTML = '<option value="">시/군/구 선택</option>';

  const districts = [...new Set(data.filter(d => d.시도명 === region).map(d => d.시군구명))];
  districts.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    districtSelect.appendChild(opt);
  });
}

function suggest() {
  const input = document.getElementById("autocomplete").value.trim();
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  if (input.length < 1) return;
  const matches = data.filter(d => (d.시도명 + " " + d.시군구명).replace(/\s/g, "").includes(input.replace(/\s/g, "")));
  const unique = [...new Set(matches.map(m => m.시도명 + " " + m.시군구명))];
  unique.slice(0, 10).forEach(loc => {
    const li = document.createElement("li");
    li.innerText = loc;
    li.onclick = () => {
      document.getElementById("autocomplete").value = loc;
      suggestions.innerHTML = "";
    };
    suggestions.appendChild(li);
  });
}

function search() {
  const value = document.getElementById("autocomplete").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  const region = document.getElementById("regionSelect").value;
  const district = document.getElementById("districtSelect").value;

  const query = value || (region && district ? region + " " + district : "");
  const normalized = query.replace(/\s/g, "");

  const filtered = data.filter(i => (i.시도명 + i.시군구명).replace(/\s/g, "") === normalized);

  if (filtered.length === 0) {
    resultDiv.innerHTML = "<p>해당 지역 정보를 찾을 수 없습니다.</p>";
    return;
  }

  filtered.forEach(i => {
    resultDiv.innerHTML += `
      <div>
        <strong>${i.시도명} ${i.시군구명} - ${i.관리구역명}</strong><br>
        🧺 생활: ${i.생활쓰레기배출방법} (요일: ${i.생활쓰레기배출요일})<br>
        🍎 음식물: ${i.음식물쓰레기배출방법} (요일: ${i.음식물쓰레기배출요일})<br>
        ♻️ 재활용: ${i.재활용품배출방법} (요일: ${i.재활용품배출요일})<br>
        🚫 미수거일: ${i.미수거일}<br>
        ☎️ 문의: ${i.관리부서전화번호}</p><hr>
      </div>
    `;
  });
}
