// Shorthand function for document.querySelector
let $ = (selector) => document.querySelector(selector);

let btn = $("#btnSearch");
let countryInput = $("#CountryInputBox");
let stateInput = $("#stateInputBox");

// Event listener for button click
btn.addEventListener("click", async () => {

    let countryName = countryInput.value.trim().toLowerCase();
    let stateName = stateInput.value.trim().toLowerCase();
    console.log(countryName);
    console.log(stateName);
    
    // input validation
    if (countryName === '' || stateName === '') {       
        window.alert('Input field required!');
    } 
    else {
        try {            
            let colleges = await getColleges(countryName, stateName);
            console.log(colleges);
            show(colleges, stateName);
            } 
        catch (error) {
            console.error("Error fetching colleges:", error);
            $("#resultList").textContent = error;
            }
    }
});

// Clear input fields on page load
window.addEventListener("load", () => {
  countryInput.value = "";
  stateInput.value = "";
});

// Function to get colleges from API
async function getColleges(country, stateName) {
  try {
    let url = `http://universities.hipolabs.com/search?name=${country}&state-province=${stateName}`;
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching colleges from getColleges:", error);
    $("#resultList").textContent = "Error fetching colleges from getColleges";
    throw error; // Re-throw the error to be caught by the calling code
  }
}

// Function to display colleges
function show(colArr, provName) {
  let list = $("#resultList");

  list.textContent = ""; // Clear previous results

  let resultsFound = false;

  // Display each result
  for (let college of colArr) {
    let stateProvince = (college["state-province"] || "").trim().toLowerCase();
    console.log(stateProvince);

    if (provName === stateProvince) {
      let li = document.createElement("li");
      li.textContent = college.name || "No name available";
      list.appendChild(li);
      console.log(college);
      resultsFound = true;
    }
  }

  if (!resultsFound) {
    list.textContent = "No results found.";
  }
}
