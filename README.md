# REST-API-Demo

Backend: javascript
Frontend: HTML/CSS

        Aceasta aplicatie foloseste cele patru tipuri de request-uri
pentru a simula un calendar cu examenele studentilor de la CTI.
	Astfel, un student poate sa introduca un examen, completand
campurile puse la dispozitie (care reprezinta informatiile necesare)
si apoi trebuie sa apese butonul "Add". Pentru aceasta actiune am
folosit operatia POST.
	Dupa ce au fost introduse datele, se poate face afisarea
calendarului sub forma de tabel prin apasarea butonului "View".
Operatia GET ia toate intrarile din tabel si afiseaza examenele
cu toate informatiile descriptive.
	Daca un examen a fost dat si datele nu mai sunt relevante,
studentul poate selecta o intrare din tabel (da click pe un
element din linia specifica examenului), aceasta este evidentiata
si apoi prin intermediul butonului "Delete" intrarea este stearsa.
Astfel, am folosit operatia DELETE.
 	Daca studentul a facut o greseala si a introdus o ora gresita
sau alte informatii eronate, poate sa editeze intrarea selectand
linia specifica si completand datele ce vor fi modificate. Prin
butonul "Edit" tabelul este actualizat. Aceasta functionalitate este
facuta cu operatia PUT.
