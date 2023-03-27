
let api , response ,defultdata ,dataCategory;

//  sidebar 

$(document).ready(function() {       
    $("#icon , .links ul li").click(function(){
        $('.sidebar').toggleClass('test');
        $('.links ul li').toggleClass('animate__fadeInUp animate__fadeOutDown ');  
        $('#icon').toggleClass('fa-x fa-align-justify');
    });
});

// get data

$(document).ready(async function() {                  
    await getMeals("search.php?s= ");
    await displayDefultData(defultdata);
    $(".loading").addClass("d-none");
});

async function getMeals(change){

    $(".loading").removeClass("d-none");

    api= await fetch(`https://www.themealdb.com/api/json/v1/1/${change}`);
    response = await api.json();
    defultdata = await response.meals;
    dataCategory = await response.categories;
    console.log(defultdata);
    console.log(dataCategory);
    $(".loading").addClass("d-none");

}

document.querySelectorAll('.links ul li').forEach(function(link){
    link.addEventListener('click', async function(){
        const category = link.dataset.category;
            
        if (category == "s"){
            displaySearch(mealsData);
        }
        if (category == "c"){
            await getMeals('categories.php');
            await displayCategory(dataCategory);
        }
        if (category == "a"){
            await getMeals('list.php?a=list');
            await displayArea(defultdata);
        } 
        if (category == "i"){
            await getMeals('list.php?i=list');
            await displayIngredients(defultdata);
        } 
        if (category == "u"){
            displayContactUs();
            $(".loading").addClass("d-none");
        } 
    })
})

async function displayDefultData(mealsData){

    
    let mealsBox =``;
    for (let i = 0; i < mealsData.length; i++) {

    

        mealsBox += `

        <div class="col-md-3"  onclick='getDetails(${mealsData[i].idMeal})'>
        <figure class="img-meal rounded-2">

          <img src="${mealsData[i].strMealThumb}" class="w-100" alt="">
          
          <div class="layer text-black">
            <h3>${mealsData[i].strMeal}</h3>
          </div>

        </figure>
      </div>

        `
        document.getElementById('mealsData').innerHTML= mealsBox;
    }
    
}

async function displayCategory(mealsData){

    
    let mealsBox =``;
    for (let i = 0; i < mealsData.length; i++) {

    let nameMeal= mealsData[i].strCategory;

        mealsBox += `

        <div class="col-md-3 card-category cursor-pointer" onclick='getMealsData("${nameMeal}","c")' >
            <figure class="img-meal rounded-2">

            <img src="${mealsData[i].strCategoryThumb}" class="w-100" alt="">
            
            <div class="layer text-black text-center d-block p-2">
                <h3>${nameMeal}</h3>
                <p>${mealsData[i].strCategoryDescription.split(" ").slice(0,20).join(' ')}</p>
            </div>

            </figure>
        </div> `
        document.getElementById('mealsData').innerHTML= mealsBox;
    }
}

async function displayArea(mealsData){

    
    let mealsBox =``;
    for (let i = 0; i < mealsData.length; i++) {

    

        mealsBox += `

        <div class="col-md-3 col-sm-6 cursor-pointer"  onclick='getMealsData("${mealsData[i].strArea}","a")'>
            <div class=" rounded-2 text-white text-center">
                <i class="fa-solid fa-house-laptop  fa-4x"></i>
                
                <h3 >${mealsData[i].strArea}</h3>
                

            </div>
      </div>

        `
        document.getElementById('mealsData').innerHTML= mealsBox;
    }
    
}

async function displayIngredients(mealsData){

    let mealsBox =``;
    for (let i = 0; i < mealsData.length; i++) {

        

        mealsBox += `

            <div class="col-md-3 cursor-pointer" onclick='getMealsData("${mealsData[i].strIngredient}","i")'>
                <div class=" rounded-2 text-white text-center p-2 overflow-hidden">

                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${mealsData[i].strIngredient}</h3>
                    <p>${mealsData[i].strDescription.split(" ").slice(0,20).join(' ')}</p>
                </div>
            </div>

        `
        document.getElementById('mealsData').innerHTML= mealsBox;
    }
    
}

function displaySearch(mealsData){

    
    mealsBox = `

        <div class="container " id="searchContainer">
            <div class="row py-4 w-75 m-auto ">
                <div class="col-md-6 ">
                    <input id='searchByName' onkeyup="search(this.value,'s')" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
                </div>
                <div class="col-md-6">
                    <input id='searchByFirstLetter'onkeyup="search(this.value,'f')"  maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
                </div>
            </div>
            <div class="row searchContainer" id='mealSearch'>
            </div>
        </div>

    `
    document.getElementById('mealsData').innerHTML= mealsBox;
}

async function search(value, type){
    await getMeals(`search.php?${type}=${value}`);
    displaySearchData(defultdata);
    $(".loading").addClass("d-none");
}
function displaySearchData(mealsData){

    
    let mealsBox =``;
    for (let i = 0; i < mealsData.length; i++) {

    

        mealsBox += `

        <div class="col-md-3">
        <figure class="img-meal rounded-2">

          <img src="${mealsData[i].strMealThumb}" class="w-100" alt="">
          
          <div class="layer text-black">
            <h3>${mealsData[i].strMeal}</h3>
          </div>

        </figure>
      </div>

        `
        document.getElementById('mealSearch').innerHTML= mealsBox;
    }
    
}

async function getMealsData(text,type){
   await getMeals(`filter.php?${type}=${text}`);
   await displayDefultData(defultdata);
}
async function getDetails(id){
    await getMeals(`lookup.php?i=${id}`);
    displayDetailsMeal(defultdata)
}


function displayDetailsMeal(mealsData){

    let mealsBox =``;
    for (let i = 0; i < mealsData.length; i++) {

        

        mealsBox += `

            <div class="col-md-4 text-white">
                <img class="w-100 rounded-3" src="${mealsData[i].strMealThumb}" alt="">
                <h2>${mealsData[i].strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${mealsData[i].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${mealsData[i].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${mealsData[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                   `

                   for (let j = 1; j < 20; j++) {
                    if(mealsData[i]['strMeasure'+j] != " " && mealsData[i]['strMeasure'+j] != null && mealsData[i]['strMeasure'+j] != "" ){
            
         mealsBox += `  <li class="alert alert-info m-2 p-1"> ${mealsData[i]['strMeasure'+j] } ${mealsData[i]['strIngredient'+j] }</li>`
                 } }
        mealsBox += `
                  
                </ul>
                
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    `
                    if (mealsData[i].strTags != null) {
                        let tags = mealsData[i].strTags.split(',') ;
                        for (let index = 0; index < tags.length; index++) {
         mealsBox +=  `
                         <li class="alert alert-danger m-2 p-1">${tags[index]}</li>
                        
                         `
                         
                        }
                    }
                 


        mealsBox += `
                       
                </ul>

                <a target="_blank" href="${mealsData[i].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${mealsData[i].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
           

        `
        document.getElementById('mealsData').innerHTML= mealsBox;
    }
    

}

function displayContactUs() {
    
    mealsBox = `

    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="validatename()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="validateEmail()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="validateNumber()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="validateAge()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" onkeyup="validatePass()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput" onkeyup="validateRepass()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
    </div>

`
document.getElementById('mealsData').innerHTML= mealsBox;
  
}

let validName  ,validEmail , validNumber , validAge, validPass , validrePass = false ;
    
function validatename(){
    let regexpName = /^[a-z A-Z]{5,}$/i;
    let testName = regexpName.test( $("#nameInput").val() );
   
    if (testName == false) {
        $("#nameAlert").removeClass("d-none"); 
        validName = false;
        $("#submitBtn").attr("disabled", true);
    }
    else{
        $("#nameAlert").addClass("d-none");
        validName = true ;
        buttonValidate();
        }
        
        
}
function validateEmail(){
    
    let regexpEmail =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let testEmail = regexpEmail.test( $("#emailInput").val() ); 
    
    if (testEmail == false) {
        $("#emailAlert").removeClass("d-none"); 
        validEmail = false;
        $("#submitBtn").attr("disabled", true);
    }
    else{
        $("#emailAlert").addClass("d-none");
        validEmail = true ;
        buttonValidate();
    }
    
}
function validateNumber(){
  
    let regexpNumber =  /^(02)?(01)[0215][0-9]{8,}$/i;
    let testNumber = regexpNumber.test( $("#phoneInput").val() ); 
   
    if (testNumber == false) {
        $("#phoneAlert").removeClass("d-none"); 
        validNumber = false;
        $("#submitBtn").attr("disabled", true);
    }
    else{
        $("#phoneAlert").addClass("d-none");
        validNumber = true ;
        buttonValidate();
    }
    
}

function validateAge(){
    let regexpName =  /^[0-9]{2}$/i;
    let testNumber = regexpName.test( $("#ageInput").val() );

    if ($("#ageInput").val() < 18 ) {
        $("#ageAlert").removeClass("d-none");
        validAge = false;
        $("#submitBtn").attr("disabled", true); 
    }
    else{
        $("#ageAlert").addClass("d-none");
        validAge = true ;
        buttonValidate();
    }

    
}
function validatePass() {
    let regexpPass = /^[a-z 0-9]{5,}$/i;
    let testPass = regexpPass.test( $("#passwordInput").val() ); 
    
    if (testPass == false) {
        $("#passwordAlert").removeClass("d-none"); 
        validPass = false;
        $("#submitBtn").attr("disabled", true);
    }
    else{
        $("#passwordAlert").addClass("d-none");
        validPass = true ;
        buttonValidate();
    }
}
function validateRepass(){
   
    if($("#passwordInput").val() != $("#repasswordInput").val() ){
        $("#repasswordAlert").removeClass("d-none");
        validrePass = false;
        $("#submitBtn").attr("disabled", true);
    }
    else{
        $("#repasswordAlert").addClass("d-none");
        validrePass = true ;
        buttonValidate();
    }
}

function buttonValidate(){
    console.log(validName + validEmail + validNumber + validAge + validPass + validrePass)
    if(validName && validEmail && validNumber && validAge && validPass && validrePass){
        $("#submitBtn").removeAttr("disabled");
    }
   
}