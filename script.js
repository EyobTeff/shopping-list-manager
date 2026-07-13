// Shopping List Manager
// This program allows users to add, remove,
// and mark shopping items as completed.

// Store all shopping items
let shoppingItems = [];

// Get elements from the HTML page
const itemInput = document.getElementById("itemInput");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const shoppingList = document.getElementById("shoppingList");
const itemCount = document.getElementById("itemCount");

// Add an item when the Add button is clicked
addButton.addEventListener("click", addItem);

// Add an item when Enter is pressed in the input box
itemInput.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		addItem();
	}
});

// Clear all items
clearButton.addEventListener("click", clearAll);

// Function to add an item
function addItem() {

	// Get the text from the input box
	const itemName = itemInput.value.trim();

	// Don't allow empty items
	if (itemName === "") {
		alert("Please enter an item.");
		return;
	}

	// Prevent duplicate items (case-insensitive)
	const duplicateItem = shoppingItems.some(function (item) {
		return item.name.toLowerCase() === itemName.toLowerCase();
	});

	if (duplicateItem) {
		alert("This item is already in your shopping list.");
		return;
	}

	// Save only month/day (example: 7/12)
	const currentDateTime = new Date().toLocaleDateString("en-US", {
		month: "numeric",
		day: "numeric"
	});

	// Create a shopping item object
	const item = {
		name: itemName,
		completed: false,
		addedAt: currentDateTime
	};

	// Add the item to the array
	shoppingItems.push(item);

	// Clear the input box
	itemInput.value = "";

	// Refresh the list
	displayItems();
}

// Function to display all shopping items
function displayItems() {

	// Clear the current list
	shoppingList.innerHTML = "";

	// Show a message when there are no items
	if (shoppingItems.length === 0) {
		const emptyMessage = document.createElement("li");
		emptyMessage.classList.add("empty-message");
		emptyMessage.textContent = "No items in your shopping list.";
		shoppingList.appendChild(emptyMessage);
		itemCount.textContent = "0";
		return;
	}

	// Loop through each shopping item
	shoppingItems.forEach((item, index) => {

		// Create a list item
		const li = document.createElement("li");

		// Create text that includes item name plus date/time added
		const itemText = document.createElement("span");
		itemText.classList.add("item-label");
		itemText.textContent = item.name + " (Added: " + (item.addedAt || "Unknown time") + ")";

		// Show completed items with a line through the item text
		if (item.completed) {
			itemText.classList.add("completed");
		}

		// Create a Complete button
		const completeButton = document.createElement("button");
		completeButton.textContent = "Complete";

		completeButton.addEventListener("click", function () {
			toggleComplete(index);
		});

		// Create a Remove button
		const removeButton = document.createElement("button");
		removeButton.textContent = "Remove";
		removeButton.classList.add("remove-btn");

		removeButton.addEventListener("click", function () {
			removeItem(index);
		});

		// Add item text and buttons to the list item
		li.appendChild(itemText);
		li.appendChild(completeButton);
		li.appendChild(removeButton);

		// Add the list item to the page
		shoppingList.appendChild(li);
	});

	// Update the total number of items
	itemCount.textContent = shoppingItems.length;
}

// Function to mark one item complete/incomplete
function toggleComplete(index) {
	shoppingItems[index].completed = !shoppingItems[index].completed;
	displayItems();
}

// Function to remove one item by index
function removeItem(index) {
	shoppingItems.splice(index, 1);
	displayItems();
}

// Function to clear all shopping items
function clearAll() {

	// Ask the user before deleting everything
	const confirmDelete = confirm("Are you sure you want to clear the shopping list?");

	if (confirmDelete) {

		// Empty the array
		shoppingItems = [];

		// Refresh the page
		displayItems();
	}
}

// Show current list when page first loads
displayItems();
