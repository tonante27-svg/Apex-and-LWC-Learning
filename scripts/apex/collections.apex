//Collections - List
//add
List<String> fruits = new List<String>();
fruits.add('Apple');
system.debug(fruits);

//add(index,value)
fruits.add(0, 'Mango');
system.debug(fruits);

//get(index)
fruits.get(1);
system.debug(fruits);

//set(index,value)
fruits.set(1, 'Banana');
system.debug(fruits);

fruits.remove(0);
system.debug(fruits);
//Size
fruits.size();
system.debug(fruits.size());

//Clear
fruits.clear();
system.debug(fruits);

// isEmpty method
system.debug('check isEmpty example ' + fruits.isEmpty());

//Contains
List<String> names = new List<String>{ 'Amit', 'Rohan', 'Mohit' };
system.debug(names.contains('Rohan'));

//Sort
List<String> colors = new List<String>{ 'Yellow', 'Red', 'Green' };

colors.sort();

System.debug(colors);
