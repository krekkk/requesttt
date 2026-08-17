const STORAGE_KEY = "miyu_game_requests";


function getRequests(){

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if(!saved){

        return [];

    }

    try{

        return JSON.parse(saved);

    }catch(error){

        console.error(
            "Gagal membaca request:",
            error
        );

        return [];

    }

}


function saveRequests(requests){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(requests)
    );

}


function cleanText(text){

    return text
        .trim()
        .replace(/\s+/g," ");

}


function submitRequest(){

    const name =
        cleanText(
            document.getElementById("name").value
        );

    const username =
        cleanText(
            document.getElementById("username").value
        );

    const game =
        cleanText(
            document.getElementById("game").value
        );

    const platform =
        document.getElementById("platform").value;

    const reason =
        cleanText(
            document.getElementById("reason").value
        );


    if(
        !name ||
        !username ||
        !game ||
        !platform
    ){

        alert(
            "Harap isi semua data yang wajib."
        );

        return;

    }


    const request = {

        id:Date.now(),

        name:name,

        username:username,

        game:game,

        platform:platform,

        reason:reason,

        status:"MENUNGGU",

        date:new Date().toLocaleString(
            "id-ID"
        )

    };


    const requests =
        getRequests();


    requests.unshift(request);


    saveRequests(requests);


    document
        .getElementById("requestForm")
        .reset();


    const message =
        document.getElementById(
            "successMessage"
        );


    message.classList.add("show");


    setTimeout(function(){

        message.classList.remove("show");

    },3000);

}


document.addEventListener(
    "DOMContentLoaded",
    function(){

        const form =
            document.getElementById(
                "requestForm"
            );


        if(!form){

            return;

        }


        form.addEventListener(
            "submit",
            function(event){

                event.preventDefault();

                submitRequest();

            }
        );

    }
);
