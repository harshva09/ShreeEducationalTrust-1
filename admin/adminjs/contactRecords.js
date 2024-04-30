// contactRecords.js
import { db, onValue, ref } from './firebase.js';

const tbody = document.getElementById('contact-records');

function renderTableRows(data) {
    tbody.innerHTML = '';
    for (const key in data) {
        const record = data[key];
        const row = `
            <tr class="align-items-left">
                <td>${record.name}</td>
                <td>${record.phonenumber}</td>
                <td>${record.email}</td>
                <td>${record.message}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    }
}

onValue(ref(db, 'contactus'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        renderTableRows(data);
    }
});
