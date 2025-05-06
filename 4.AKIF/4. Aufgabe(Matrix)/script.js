
function parseMatrix(text) {
    return text.trim().split(/\r?\n/).map(row => row.trim().split(/\s+/).map(Number));
  }
  function matrixToString(mat) {
    return mat.map(row => row.join(' ')).join('\n');
  }
  
  function multiply(A, B) {
     const n = A.length, p = A[0].length, m = B[0].length;
    const C = Array.from({ length: n }, () => Array(m).fill(0));
    for (let i = 0; i < n; i++)
      for (let j = 0; j < m; j++)
        for (let k = 0; k < p; k++)
          C[i][j] += A[i][k] * B[k][j];
    return C;
  }
  function adjacency(matrix) {
    return matrix.map(row => row.map(v => v !== 0 ? 1 : 0));
  }
  function power(matrix, exp) {
    let result = matrix;
    for (let e = 1; e < exp; e++) result = multiply(result, matrix);
    return result;
  }
  function distance(matrix) {
    const n = matrix.length;
    const dist = matrix.map((row, i) => row.map((v, j) => (i === j ? 0 : (v === 0 ? Infinity : v))));
    for (let k = 0; k < n; k++)
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
          if (dist[i][k] + dist[k][j] < dist[i][j])
            dist[i][j] = dist[i][k] + dist[k][j];
    return dist;
  }
  function shortestPath(weights, start, end) {
    const n = weights.length;
    const dist = Array(n).fill(Infinity);
    const prev = Array(n).fill(null);
    const visited = Array(n).fill(false);
    dist[start] = 0;
    for (let i = 0; i < n; i++) {
      let u = -1;
      for (let j = 0; j < n; j++)
        if (!visited[j] && (u === -1 || dist[j] < dist[u])) u = j;
      if (u === -1) break;
      visited[u] = true;
      for (let v = 0; v < n; v++) {
        const w = weights[u][v] || Infinity;
        if (!visited[v] && dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
          prev[v] = u;
        }
      }
    }
    const path = [];
    for (let u = end; u !== null; u = prev[u]) path.unshift(u);
    return { path, distance: dist[end] };
  }
  
   document.addEventListener('DOMContentLoaded', () => {
    const opSelect = document.getElementById('operation');
    const inputsDiv = document.getElementById('inputs');
    const computeBtn = document.getElementById('compute');
    const resultPre = document.getElementById('result');
  
    function renderInputs() {
      const op = opSelect.value;
      inputsDiv.innerHTML = '';
      if (op === 'multiply') {
        inputsDiv.innerHTML = `
          <label>Matrix A (Zeilenumbruch = neue Zeile, Leerzeichen = Spalte):
            <textarea id="matA" rows="4"></textarea>
          </label>
          <label>Matrix B:
            <textarea id="matB" rows="4"></textarea>
          </label>
        `;
      } else {
        inputsDiv.innerHTML = `
          <label>Matrix (Gewichtsmatrix):
            <textarea id="mat" rows="4"></textarea>
          </label>
        `;
        if (op === 'power') {
          inputsDiv.innerHTML += `
             <label>Exponent (Potenz):
                <input type="number" id="exp" value="2" min="1">
             </label>
          `;
        }
        if (op === 'shortestPath') {
          inputsDiv.innerHTML += `
            <label>Startknoten (0-basierter Index):
              <input type="number" id="start" value="0" min="0">
            </label>
            <label>Zielknoten (0-basierter Index):
              <input type="number" id="end" value="1" min="0">
            </label>
          `;
        }
      }
    }
  
    opSelect.addEventListener('change', renderInputs);
    renderInputs();
  
      computeBtn.addEventListener('click', () => {
      let output = '';
      try {
        if (opSelect.value === 'multiply') {
          const A = parseMatrix(document.getElementById('matA').value);
          const B = parseMatrix(document.getElementById('matB').value);
          output = matrixToString(multiply(A, B));
        } else {
          const M = parseMatrix(document.getElementById('mat').value);
          switch (opSelect.value) {
            case 'adjacency':
              output = matrixToString(adjacency(M));
              break;
            case 'power':
              output = matrixToString(power(M, +document.getElementById('exp').value));
              break;
            case 'distance':
              output = matrixToString(distance(M));
              break;
            case 'weight':
              output = matrixToString(M);
              break;
             case 'shortestPath': {
              const res = shortestPath(
                M,
                +document.getElementById('start').value,
                +document.getElementById('end').value
              );
              output = `Pfad: ${res.path.join(' → ')}\nDistanz: ${res.distance}`;
              break;
            }
          }
        }
      } catch (err) {
        output = 'Fehler: ' + err.message;
      }
      resultPre.textContent = output;
    });
  });
  