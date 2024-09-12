document.addEventListener('DOMContentLoaded', () => {
    const westminsterUrl = "http://localhost:3000/dogs";
    const registeredDogsTable = document.getElementById("table-body");
    const editDogForm = document.getElementById("dog-form");
    let currentDogId = null; 

    function fetchDogs() {
        fetch(westminsterUrl)
            .then(response => response.json())
            .then(data => {
                
                registeredDogsTable.innerHTML = '';

                displayDogs(data);
            })
            .catch((error) => console.error("dog list fetch failed", error));
    }

    function displayDogs(dogs) {
        dogs.forEach(dog => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = dog.name;
            row.appendChild(nameCell);

            const breedCell = document.createElement("td");
            breedCell.textContent = dog.breed;
            row.appendChild(breedCell);

            const sexCell = document.createElement("td");
            sexCell.textContent = dog.sex;
            row.appendChild(sexCell);

            const editDogCell = document.createElement("td");
            const editButton = document.createElement("button");
            editButton.innerText = "Edit Dog";
            editDogCell.appendChild(editButton);
            row.appendChild(editDogCell);

            editButton.addEventListener("click", () => {
                editDogForm.name.value = dog.name;
                editDogForm.breed.value = dog.breed;
                editDogForm.sex.value = dog.sex;
                currentDogId = dog.id; 
            });

            registeredDogsTable.appendChild(row);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const updatedDog = {
            name: editDogForm.name.value,
            breed: editDogForm.breed.value,
            sex: editDogForm.sex.value
        };

        fetch(`${westminsterUrl}/${currentDogId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(updatedDog)
        })
        .then(response => response.json())
        .then(data => {
            console.log("dog updated:", data);

            
            fetchDogs();
        })
        .catch(error => console.error("error updating dog:", error));
    }

    editDogForm.addEventListener("submit", handleSubmit);

    fetchDogs();
});






