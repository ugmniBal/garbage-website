const data = []; // 여기에 JSON 배열을 직접 붙여넣거나 외부 파일로 불러오세요
let matchList = [];

function suggest() {
  const input = document.getElementById("autocomplete").value.trim();
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";
  if (input.length < 1) return;

  const matches = data.filter(item => (item.시도명 + " " + item.시군구명).includes(input));
  matchList = matches;
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

  const filtered = data.filter(i => (i.시도명 + " " + i.시군구명) === value);

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
