# Advent of code

- Challenge : [Advent of code](https://adventofcode.com/)

# Codes

Codes for the previous Advent of code editions

- [2015 Edition](year-2015/)

- [2017 Edition](year-2017/)

- [2018 Edition](year-2018/)

- [2019 Edition](year-2019/)

- [2020 Edition](year-2020/)

- [2021 Edition](year-2021/)

# How to use

## Install

```
git clone https://github.com/PerthuisQuentin/battle-dev.git
npm install
```

## Run tests

```
npm test
```

Options

```
--year <string>
	Use a string as filter on years

--day <string>
	Use a string as filter on days

--part <string>
	Use a string as filter on parts

--test <string>
	Use a string as filter on tests
```

Example

```
npm test -- --year 2019 --day 05 --part 2 --test 01
```

## Init day files

```
npm run initDay
```

Options

```
--year <string>
	year number (2015, 2016, etc...)

--day <string>
	day number (1, 2, 3, etc...)
```

Example

```
npm run initDay -- --year 2019 --day 5
```

## Update day list

```
npm run updateDaysList
```

Options

```
--year <string>
	year number (2015, 2016, etc...)
```

Example

```
npm run updateDaysList -- --year 2019
```