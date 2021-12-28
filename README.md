# dvar-torah
An api that generate every week "dvar torah" to the corrent week and print it to my printer
## Background
Every Friday I usually print a Dvar Torah for the Shabbat table. I have noticed that the action I perform is constant and every time I take from the same site, only the parameter that changes is the Parasha of the week. So I decided I would just make a program that would do it every Friday in my place :)
## How it works?
#### 1) Get the current Parasha:<br/>
First of all, I need to get the name of the current Parsha of the week to move into the next step.
For this function I use Hebcal API that will bring to me the current Parasha.
The link to their Shabbat API is - https://www.hebcal.com/shabbat?cfg=json
#### 2) Get the url of the Dvar Torah site:<br/>
After I got the Parasha, I need to get the url of the Dvar Torah.<br/>
The site that I chose to get Dvars Torah is http://www.kaduri.net/.<br/>
Due to their links generator is completely random and their internal website search is not working well - the best solution that I had to get the url of the current Parasha is by doing a Google search.<br/>
So I use Serpstack API to get Google search results by custom search.<br/>
My goal was to make sure that the first result in that search will bring to me the url that I want
So I did some searches to see what brings me always my goal. The search query that I decided to is following this path:<br/>
`דבר תורה קצר לשולחן השבת, פרשת ${parasha.hebrew.replace('פרשת ','')} - כדורי.נט site:http://www.kaduri.net/`<br/>
I added `site:http://www.kaduri.net/` to make sure that the all results will be only from my target site.
#### 3) Get the HTML Dvar Torah page:<br/>
When I have my target url I just need to get the HTML of the page to start retrieve information from the page.
#### 4) Make a new HTML page that contains the Dvar Torah text only:<br/>
This part contains 2 steps to get the final result:
1) First I need to make an object that will contains Vorts only which are in the site. For that step I analyzed the page to see how they built the HTML and what tags they used.
After, I wrote a function that will take the text that I want by using jQuery, and build an object from that.
2) Then, I wrote a function that get this object and make a new custom HTML page that paste the text in the places that I want with some style for good looking printing.
#### 5) Convert to PDF and send for printing:<br/>
Becuase can't print an HTML page via email I needed to convert my custom HTML to PDF file.<br/>
For that action I used an PDF converter API - https://api.html2pdf.app/v1/generate which returns me a PDF file by POSTing an HTML file.<br/>
After I get the PDF file I send it to my printer email.
#### 5) Scheduling hours for printing:<br/>
My problem was that I deployed my program to Heroku and my free account have a lot of limits.<br/>
One of the limit was that my program will shut down if there won't be any opertion, and my opertion is launched only once a week.<br/>
So the solution that I chose is to make my program to an API which every time get a request, it sending an email to my printer for printing.<br/>
I use a webhook that sends every week at Friday 13:00 a request to my API.<br/>
The webhook site that I use is https://pipedream.com/.<br/>
The cron Expression is `00 13 * * FRI`

## Features
#### 1) Get the current Parasha:<br/>
## Problem sovling
