// Shorthand function for document.querySelector
let $ = (selector) => document.querySelector(selector);

let btn = $("#btnSearch");
let countryName;
let provinceName;

// Event listener for button click
btn.addEventListener("click", async () => {
  countryName = "india";
  provinceName = `${$("#stateInputBox").value}`;
  stateName = provinceName.trim().toLowerCase();
  console.log(countryName);
  console.log(stateName);

  try {
    let colleges = await getColleges(countryName, stateName);
    console.log(colleges);
    show(colleges, stateName);
  } catch (error) {
    console.error("Error fetching colleges:", error);
    $("#resultList").textContent = "An error occurred while fetching data.";
  }
});

// Clear input fields on page load
window.addEventListener("load", () => {
  $("#CountryInputBox").value = "";
  $("#stateInputBox").value = "";
});

// Function to get colleges from API
async function getColleges(country, stateName) {
  try {
    let url = `http://universities.hipolabs.com/search?name=${country}&state-province=${stateName}`;
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching colleges:", error);
    throw error; // Re-throw the error to be caught by the calling code
  }
}

// Function to display colleges
function show(colArr, provName) {
    let list = $("#resultList");
  
    list.innerText = ""; // Clear previous results
  
    let resultsFound = false;
  
    // Display each result
    for (let college of colArr) {
      let stateProvince = college["state-province"].trim().toLowerCase();
      console.log(stateProvince);
  
      if (stateProvince === provName) {
        let li = document.createElement("li");
  
        // Uses college.name if it exists and is not falsy
        // If college.name is falsy (undefined, null, empty string, etc.), use 'No name available' as a fallback
        li.innerText = college.name || "No name available";
  
        list.appendChild(li);
        console.log(college);
        resultsFound = true;
      }
    }
  
    if (!resultsFound) {
      list.textContent = "No results found.";
    }
  }