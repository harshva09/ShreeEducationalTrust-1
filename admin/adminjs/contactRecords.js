// contactRecords.js
// import { db, onValue, ref } from './firebase.js';

// const tbody = document.getElementById('contact-records');

// function renderTableRows(data) {
//     tbody.innerHTML = '';
//     for (const key in data) {
//         const record = data[key];
//         const row = `
//             <tr>
//                 <td>${record.name}</td>
//                 <td>${record.phonenumber}</td>
//                 <td>${record.email}</td>
//                 <td>${record.message}</td>
//             </tr>
//         `;
//         tbody.insertAdjacentHTML('beforeend', row);
//     }
// }

// onValue(ref(db, 'contactus'), (snapshot) => {
//     const data = snapshot.val();
//     if (data) {
//         renderTableRows(data);
//     }
// });


import { db, onValue, ref } from './firebase.js';

const tbody = document.getElementById('contact-records');
const pagination = document.getElementById('pagination');
const rowsPerPage = 5; // Number of rows per page

function renderTableRows(data, page) {
    tbody.innerHTML = '';
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    for (let i = 0; i < paginatedData.length; i++) {
        const record = paginatedData[i];
        const message = record.message.length > 50 ? record.message.substring(0, 50) + '...' : record.message;
        const messageCell = record.message.length > 50 ?
            `<td><span class="message">${message}</span><span class="read-more" style="cursor: pointer; color: blue;" data-full-message="${record.message}">Read more</span></td>` :
            `<td>${message}</td>`;
        const row = `
            <tr>
                <td>${startIndex + i + 1}</td>
                <td>${record.name}</td>
                <td>${record.email}</td>
                <td>${record.phonenumber}</td>
                ${messageCell}
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    }

    // Attach event listener for read more
    document.querySelectorAll('.read-more').forEach(item => {
        item.addEventListener('click', () => {
            const fullMessage = item.dataset.fullMessage;
            item.previousElementSibling.innerHTML = fullMessage;
            item.style.display = 'none';
        });
    });
}

function renderPagination(data) {
    pagination.innerHTML = '';
    const numPages = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= numPages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        const link = document.createElement('a');
        link.classList.add('page-link');
        link.href = '#';
        link.textContent = i;
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            renderTableRows(data, i);
        });
        li.appendChild(link);
        pagination.appendChild(li);
    }
}

onValue(ref(db, 'contactus'), (snapshot) => {
    const data = Object.values(snapshot.val() || {});
    renderTableRows(data, 1);
    renderPagination(data);
});



