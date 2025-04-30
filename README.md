# Calorie Tracker

Calorie Tracker is een webapplicatie waarmee gebruikers hun dagelijkse voedselinname kunnen bijhouden, voedingsstoffen kunnen monitoren en gezondere keuzes kunnen maken.

Inhoudsopgave

Introductie

Functionaliteiten

Installatie

Configuratie

Scripts

Testaccounts

API-gebruik

1. Introductie

Deze applicatie is ontwikkeld in het kader van de frontend-eindopdracht aan NOVI Hogeschool. De Calorie Tracker stelt gebruikers in staat om voedingsmiddelen op te zoeken via een externe API (Edamam), en om die gegevens op te slaan, terug te zien en te beheren.

De applicatie is gebouwd met React en maakt gebruik van tools zoals Context API, React Router en localStorage.

2. Functionaliteiten
   
Gebruiker kan registreren en inloggen

Eten toevoegen via Edamam Nutrition API

Dagelijkse samenvatting van calorieën, eiwitten, vetten en koolhydraten

Favorietenlijst met veelgebruikte producten

Visueel dashboard

Bescherming van routes voor ingelogde gebruikers

3. Installatie
   
a) Clone de repository:
git clone https://github.com/jouwgebruikersnaam/calorie-tracker.git
cd calorie-tracker

b) Installeer dependencies:
npm install

c) Maak een .env bestand aan in de root-map en voeg de volgende variabelen toe:
REACT_APP_EDAMAM_APP_ID=je_app_id
REACT_APP_EDAMAM_API_KEY=je_api_key
REACT_APP_API_URL=https://frontend-educational-backend.herokuapp.com/api

Gebruik voor testen eventueel deze waarden:
App ID: 78a4cb11  
API Key: d2b586b3fe4a1e5af13a1a1d16d269bd

d) Start de ontwikkelserver:
npm start
Bezoek vervolgens http://localhost:3000 in je browser.

4. Configuratie

De app gebruikt de Edamam Nutrition API voor voedingsgegevens.
NOVI’s backend is gebruikt voor authenticatie (/auth/signin, /auth/signup) en gebruikersdata.

5. Scripts

-npm start: start de applicatie in ontwikkelmodus

-npm run build: maakt een productieversie van de app

-npm run lint: controleert de code op fouten

-npm run format: formatteert de code met Prettier

6. Testaccounts

Voor testdoeleinden moet je je eigen account registreren:

1. Navigeer naar de registratiepagina door te klikken op "Registreren"
2. Vul de volgende gegevens in:
    - Gebruikersnaam: kies een gebruikersnaam
    - E-mail: vul een geldig e-mailadres in
    - Wachtwoord: kies een wachtwoord (minimaal 8 tekens, inclusief een hoofdletter, een cijfer en een speciaal teken)
3. Klik op "Registreren"
4. Je bent nu geregistreerd en ga nu naar inloggen

7. API-gebruik

De applicatie haalt voedingsinformatie op via de Edamam API, en gebruikt de NOVI Educational Backend voor gebruikersauthenticatie.


Gemaakt voor het vak Frontend Development aan NOVI Hogeschool.