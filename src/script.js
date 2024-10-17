const embalses = [
    { nombre: "Embalse de Alcántara", actual: 500, maxima: 1000 },
    { nombre: "Embalse de Mequinenza", actual: 300, maxima: 1500 },
    { nombre: "Embalse de El Grado", actual: 700, maxima: 1200 },
    // Añade más embalses según sea necesario
];

function loadEmbalses() {
    const tbody = document.getElementById('embalsesBody');
    tbody.innerHTML = '';
    embalses.forEach(embalse => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${embalse.nombre}</td>
            <td>${embalse.actual}</td>
            <td>${embalse.maxima}</td>
        `;
        tbody.appendChild(row);
    });
}

function filterEmbalses() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredEmbalses = embalses.filter(embalse => embalse.nombre.toLowerCase().includes(searchValue));
    const tbody = document.getElementById('embalsesBody');
    tbody.innerHTML = '';
    filteredEmbalses.forEach(embalse => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${embalse.nombre}</td>
            <td>${embalse.actual}</td>
            <td>${embalse.maxima}</td>
        `;
        tbody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', loadEmbalses);
