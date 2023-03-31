class Film
{

    id
    naslov
    glavni_glumac
    godina
    ocena
    zanr


    constructor(id,naslov,glavni_glumac,godina,ocena,zanr)
    {
        this.id = id
        this.naslov = naslov
        this.glavni_glumac = glavni_glumac 
        this.godina = godina
        this.ocena = ocena
        this.zanr = zanr
    }

    static napravi_th(text)
    {
        var novi_th = document.createElement('th');
        novi_th.innerText = text;
        return novi_th;
    }
}

// f1 = new Film(1,"Primal Fear", "Antonio Banderas",2001,8.9,"misterija");
// f2 = new Film(2,"Se7en", "Morgan Freeman",1998,9.9,"triler");
// f3 = new Film(3,"The Shuttered island", "Brad Pit",2010,9.3,"misterija");


// niz_filmova = [f1,f2,f3];

// localStorage.clear();

// localStorage.setItem("svi_filmovi", JSON.stringify(niz_filmova));

window.addEventListener('load', init)

var niz_filmova;
var tabela;
var dodaj_film_dugme;
var brojac = 0;

function init()
{
    niz_filmova = JSON.parse(localStorage.getItem('svi_filmovi'));
    tabela = document.getElementById('tabela');

    for (const film of niz_filmova) {
        var novi_red = document.createElement('tr');
        for (const key in film) {
            if (Object.hasOwnProperty.call(film, key)) {
                const element = film[key];
                var novi_th = Film.napravi_th(element);
                novi_red.appendChild(novi_th);     
            }
        }

        var th_delete = Film.napravi_th("Delete");
        
        th_delete.id = "delete_" + brojac;
        th_delete.classList.add("delete"); 
        novi_red.appendChild(th_delete);


        var th_update = Film.napravi_th("Update");
        
        th_update.id = "update_" + brojac;
        th_update.classList.add("update"); 
        novi_red.appendChild(th_update);

        tabela.appendChild(novi_red);

        th_delete.addEventListener('click',obrisi_iz_tabela);
        th_update.addEventListener('click',azuriraj_film);

        brojac++;
    }


    dodaj_film_dugme = document.getElementById('dodaj_film');
    dodaj_film_dugme.addEventListener('click', dodajFilm);


}


function dodajFilm(event)
{
    event.preventDefault();
    
    var id_element = document.getElementById('id');
    var naslov_element = document.getElementById('naslov');
    var glavni_glumac_element = document.getElementById('glavni_glumac');
    var godina_element = document.getElementById('godina');
    var ocena_element = document.getElementById('ocena');
    var zanr_element = document.getElementById('zanr');

    id = id_element.value;
    naslov = naslov_element.value;
    glavni_glumac = glavni_glumac_element.value;
    godina = godina_element.value;
    ocena = ocena_element.value;
    zanr = zanr_element.value;

    if(id == "" || naslov == "" || glavni_glumac == "" ||  godina== "" || ocena == "" || zanr == "" )
    {
        window.alert("Moraju svi podaci da budu popunjeni !")
        return;
    }

    if(validiraj_naslov(naslov) == false)
    {
        return;
    }

    if(validiraj_glavnog_glumca(glavni_glumac) == false)
    {
        return;
    }

    if(validiraj_godinu(godina) == false)
    {
        return;
    }

    if(validiraj_ocenu(ocena) == false)
    {
        return;
    }

    if(validiraj_zanr(zanr) == false)
    {
        return;
    }

    if(proveri_da_li_postoji_id_u_storage(id) == true)
    {
        alert(`ID:${id} vec postoji u bazi`);
        return;
    }

    var f = new Film(id,naslov,glavni_glumac,godina,ocena,zanr)
    var svi_filmovi = JSON.parse(localStorage.getItem('svi_filmovi') || []);
    svi_filmovi.push(f);
    localStorage.setItem('svi_filmovi',JSON.stringify(svi_filmovi));
    location.reload();

}  

function validiraj_naslov(naslov)
{ 
    var naslov_input = document.getElementById('naslov');
    if(naslov.length < 2)
    {
        naslov_input.classList.add('los_task');
        naslov_greska.style.display='block';
        return false;
    }
    else
    {
        naslov_input.classList.remove('los_task');
        naslov_greska.style.display='none';
        return true;
    }
}

function proveri_prvo_slovo(text) {
    var prvo_slovo_regex = /^[A-Z]/;
    return prvo_slovo_regex.test(text);
}

function validiraj_glavnog_glumca(glavni_glumac)
{
    var glavni_glumac_input = document.getElementById('glavni_glumac');
    var glumac_greska = document.getElementById('glumac_greska');

    if (!proveri_prvo_slovo(glavni_glumac)) {
        glavni_glumac_input.classList.add('los_task');
        glumac_greska.style.display = 'block';
        return false;
      } else {
        glavni_glumac_input.classList.remove('los_task');
        glumac_greska.style.display = 'none';
        return true;
      }
}

function validiraj_godinu(godina)
{
    var godina_input = document.getElementById('godina');
    var godina_greska = document.getElementById('godina_greska');

    if(godina < 0 || godina >= 2023)
    {
        godina_input.classList.add('los_task');
        godina_greska.style.display = 'block';
        return false;
    }
    else
    {
        godina_input.classList.remove('los_task');
        godina_greska.style.display = 'none';
        return true;
    }
}


function validiraj_ocenu(ocena)
{
    
    var ocena_input = document.getElementById('ocena');
    var ocena_greska = document.getElementById('ocena_greska');

    if(ocena < 0 || ocena > 10)
    {
        ocena_input.classList.add('los_task');
        ocena_greska.style.display =  'block';
        return false;
    }
    else
    {
        ocena_input.classList.remove('los_task');
        ocena_greska.style.display = 'none';
        return true;
    }
}

function validiraj_zanr(zanr)
{
    var zanr_input = document.getElementById('zanr');
    var prihvatljivi_zanrovi = ['avantura','animacija','akcija','biografski','vestern','deciji','dokumentarni','drama','istorijski','komedija','kriminalisticki','ljubavni','misterija','triler','fantastika','horor','sportski']

    if (!prihvatljivi_zanrovi.includes(zanr)) {
        zanr_input.classList.add('los_task');
        zanr_greska.style.display = 'block';
        return false;

    } else {
        zanr_input.classList.remove('los_task');
        zanr_greska.style.display = 'none';
        return true;
    }
}

function proveri_da_li_postoji_id_u_storage(id)
{
    var svi_filmovi = JSON.parse(localStorage.getItem('svi_filmovi')) || [];
    for (const film of svi_filmovi) {
        if(film.id == id)
        {
            return true; //ako se poklopi id
        }
        
    }
    return false; // ako se ne poklopi
}

function obrisi_iz_tabela(event)
{
    var meta = event.target;
    console.log(meta);
    var id_mete = meta.id //uzimamo ceo paragraf sa idem delete_?
    var delovi_id_mete = id_mete.split("_") // razdvajamo delete_? sa split
    var pozicija = parseInt(delovi_id_mete[1]) // uzimamo prvu poziciju sto nam je ?(id odredjeni)


    var svi_filmovi = JSON.parse(localStorage.getItem('svi_filmovi'))
    svi_filmovi.splice(pozicija,1); 

    localStorage.setItem('svi_filmovi', JSON.stringify(svi_filmovi));
    location.reload();
}


function azuriraj_film(event)
{
    var pozicija = parseInt(event.target.id.split("_")[1]);
    // console.log(pozicija);

    var svi_filmovi = JSON.parse(localStorage.getItem('svi_filmovi'));
    var trenutni_film = svi_filmovi[pozicija];
    // console.log('desio se prikaz');

    var prostor_za_update = document.getElementById('za_update');

    prostor_za_update.innerHTML = `
    <div class="forma_za_update">

    <h3>Forma za azuriranje filma</h3>
    <form action="">

        <p id="update_paragraf">
            <label for="id">ID: </label>
            <input type="text" name='id' id="id" value=${trenutni_film.id} readonly>
        </p>    

        <p id="update_paragraf">
            <label for="naslov">Naslov: </label>
            <input type="text" name="naslov" id="naslov"  value='${trenutni_film.naslov}'>
            <span id="naslov_greska">Naslov mora da ima makar 2 slova</span>
        </p>

        <p id="update_paragraf">
            <label for="glavni_glumac">Glavni glumac: </label>
            <input type="text" name="glavni_glumac" id="glavni_glumac"  value='${trenutni_film.glavni_glumac}'>
            <span id="glumac_greska">Prvo slovo mora biti veliko! </span>
        </p>

        <p id="update_paragraf">
            <label for="godina">Godina: </label>
            <input type="number" name="godina" id="godina"  value=${trenutni_film.godina}>
            <span id="godina_greska">Godina koju ste uneli nije ispravna</span>
        </p>

        <p id="update_paragraf">
            <label for="ocena">Ocena: </label>
            <input type="number" name="ocena" step="0.1" id="ocena"  value=${trenutni_film.ocena}>
            <span id="ocena_greska">Ocena mora biti izmedju 1 i 10</span>
        </p>

        <p id="update_paragraf">
            <label for="zanr">Zanr: </label>
            <input type="text" name="zanr" id="zanr"  value=${trenutni_film.zanr}>
            <span id="zanr_greska">Ne postoji zanr</span>
        </p>

        <button id="izmeni_film"> Izmeni film! </button>

    </form>

    </div>
    `

    var dugme_izmeni_film = document.getElementById('izmeni_film');
    dugme_izmeni_film.addEventListener('click',update_film);
}

function update_film(event)
{

    event.preventDefault();

    var forma = document.querySelector('.forma_za_update form');
    var formData = new FormData(forma);
      
    var f = new Film(
    formData.get('id'),
    formData.get('naslov'),
    formData.get('glavni_glumac'),
    formData.get('godina'),
    formData.get('ocena'),
    formData.get('zanr')
    );
      
    console.log(f);
      
    var svi_filmovi = JSON.parse(localStorage.getItem('svi_filmovi')) || []; 
    var n = svi_filmovi.length;

    for(var i = 0; i< n; i++)
    {
       if(svi_filmovi[i].id == f.id)
        {
           svi_filmovi[i] = f
           break;
       }
    }

    localStorage.setItem('svi_filmovi',JSON.stringify(svi_filmovi));
    location.reload();
}
