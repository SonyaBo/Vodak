const button = document.getElementById("my-button");
  
function submitForm() {
    const nicknameInput = document.getElementById("nick").value;
    const isSwimmerInputs = document.querySelectorAll("input[name='je_plavec']:checked");
    let isSwimmerInput = 0; // Default value if not selected

    // Find the checked "Ano" option
    isSwimmerInputs.forEach(input => {
      if (input.value === "1") {
        isSwimmerInput = 1;
      }
    });

    const canoeCompanionInput = document.getElementById("kanoe_kamarad").value;

    function validateForm(event) {
        event.preventDefault(); // Prevent the form from submitting
  
        // Clear previous error messages
        document.getElementById('errorMessages').innerHTML = '';
  
        var isSwimmerInput = document.getElementById('swimmerInput').value;
        var nicknameInput = document.getElementById('nicknameInput').value;
  
        // Check validation conditions
        if (isSwimmerInput.trim() === '') {
          displayError("Musite umet plavat pro registraci");
          return;
        }
  
        if (!validateNickname(nicknameInput)) {
          displayError("Zadejte valdini jmeno (2-20 znaků, čísla a písmena bez mezer)");
          return;
        }
  
        // If validation passes, you can proceed with form submission or other actions
        // Here you can add code to submit the form or perform other actions
      }
  
      function validateNickname(nickname) {
        // Your nickname validation logic goes here
        return nickname.trim() !== ''; // Example: Nickname should not be empty
      }
  
      function displayError(message) {
        var errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        document.getElementById('errorMessages').appendChild(errorDiv);
      }

    const data = {};

    data[0] = nicknameInput;
    data[1] = canoeCompanionInput;

    console.log(data);

    var xhr = new XMLHttpRequest();

    // Specifikace HTTP metody a URL, ke které se AJAX request odesílá
    xhr.open('POST', '/registrovat', true);

    // Nastavení headerů pro AJAX request
    xhr.setRequestHeader('Content-type', 'application/json');

    // Nastavení funkce, která se spustí, když se AJAX request dokončí
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Zpracování úspěšné odpovědi od serveru
        var response = JSON.parse(xhr.responseText);
        console.log(response);
      } else {
        // Zpracování chybové odpovědi od serveru
        console.log('Chyba při načítání dat: ' + xhr.status);
      }
    };

    // Odeslání AJAX requestu na server s JSON polem
    xhr.send(JSON.stringify(data));

    window.location.href = '/friends';
  


function validateNickname(nickname) {

const pattern = /^[A-Za-z ]{2,20}$/;
return pattern.test(nickname);
}



const dataSKamarady = [];

async function selectKamarada() {
let url = "http://www12.spse.1984.cz/zaregistrovani";

try {
  let response = await fetch(url);
  let data = await response.json();

  // Vyberte kontejner, kam budete vkládat možnosti do selectu
  const selectElement = document.getElementById('kanoe_kamarad');

  // Přidání prázdné možnosti
  const emptyOptionElement = document.createElement('option');
  emptyOptionElement.value = "";
  emptyOptionElement.text = "Nemám kamaráda";
  selectElement.appendChild(emptyOptionElement);

  // Pomocná funkce pro rekurzivní průchod datovou strukturou
  function processRecord(record) {
    if (Array.isArray(record)) {
      record.forEach((item, index) => {
        processRecord(item);
      });
    } else {
      try {
        const nickname = record[0]; // Přizpůsobeno pro novou strukturu dat
        if (nickname !== undefined) {
          dataSKamarady.push(nickname);

          // Vytvoření možnosti do selectu
          const optionElement = document.createElement('option');
          optionElement.value = nickname;
          optionElement.text = nickname;
          selectElement.appendChild(optionElement);
        }
      } catch (error) {
        console.error('Chyba při zpracování záznamu:', error);
      }
    }
  }

  // Zavolejte funkci pro každý záznam
  processRecord(data);

} catch (error) {
  console.error('Chyba při načítání dat:', error);
}
}

async function vypis() {
let url = "http://www12.spse.1984.cz/zaregistrovani";
let response = await fetch(url);
let data = await response.json();

// Vyberte kontejner, kam budete vkládat výstup
const outputContainer = document.getElementById('outputContainer');

// Pro každý záznam v trojrozměrném poli vytvořte HTML prvky a vložte je do kontejneru
data.forEach((recordLevel1, indexLevel1) => {
  recordLevel1.forEach((recordLevel2, indexLevel2) => {
    const recordDiv = document.createElement('div');
    recordDiv.innerHTML = `<p><strong>Student ${indexLevel2 + 1}:</strong></p>`;

    // Pro každý klíč v objektu záznamu vytvořte HTML prvek
    for (const key in recordLevel2) {
      if (Object.hasOwnProperty.call(recordLevel2, key)) {
        const value = recordLevel2[key] || 'Není dostupné';
        // Vložení do vytvořeného HTML prvku
        recordDiv.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
      }
    }

    // Vložení vytvořeného HTML prvku do kontejneru
    outputContainer.appendChild(recordDiv);
  });
});
}
}
