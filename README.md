# load-large-csv
The purpose of this repo is to implement the following logic by working with a very large csv file.
To facilitate the original file, the first four rows are removed.

## The logic

1. Create an application that generates outputs to the following from `data.csv`:

	1a. The country with the highest average "Urban population growth (annual %)" between 1980 and 1990. Exclude countries where any data entry for this time range is missing.

	1b. The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.
  
2. Display the results to the user.

## Pre-installed
You should have `NodeJs` and `npm`. 

## Installation

1. Checkout the project:
```
git clone git@github.com:go8soft/load-large-csv.git
```

2. Install the modules:
```
  $ npm install
```
This will create `node_modules`.

3. Put `data.csv` file into project directory (example: `~/load-large-csv`)

4. Run:
```
$ node index.js
```
The output should be something like:
```
{ population: { name: 'Botswana', value: 135.50734500355702 } }
{ country: 'World', year: 2014, value: 36138285 }
```
