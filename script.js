const unitData = {
  length: ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Inch', 'Foot', 'Yard', 'Mile'],
  volume: ['Liter', 'Milliliter', 'Cubic Meter', 'Cubic Inch', 'Gallon', 'Quart'],
  weight: ['Gram', 'Kilogram', 'Milligram', 'Pound', 'Ounce'],
  temperature: ['Celsius', 'Fahrenheit', 'Kelvin']
};

const tabs = document.querySelectorAll('.tab');
const fromSelect = document.getElementById('fromUnit');
const toSelect = document.getElementById('toUnit');
const inputValue = document.getElementById('inputValue');
const resultDisplay = document.getElementById('result');

function populateUnits(category) {
  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';
  unitData[category].forEach(unit => {
    const option1 = document.createElement('option');
    option1.value = unit;
    option1.textContent = unit;

    const option2 = option1.cloneNode(true);
    fromSelect.appendChild(option1);
    toSelect.appendChild(option2);
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.dataset.category;
    populateUnits(category);
    updateResult(); // recalculate on category change
  });
});

const lengthConversions = {
  Meter: 1,
  Kilometer: 1000,
  Centimeter: 0.01,
  Millimeter: 0.001,
  Inch: 0.0254,
  Foot: 0.3048,
  Yard: 0.9144,
  Mile: 1609.34
};

function convertLength(value, fromUnit, toUnit) {
  const inMeters = value * lengthConversions[fromUnit];
  const converted = inMeters / lengthConversions[toUnit];
  return converted;
}

function updateResult() {
  const value = parseFloat(inputValue.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (isNaN(value) || !from || !to) {
    resultDisplay.textContent = 'Result: —';
    return;
  }

  const category = document.querySelector('.tab.active').dataset.category;

  if (category === 'length') {
    const result = convertLength(value, from, to);
    resultDisplay.textContent = `Result: ${result.toFixed(4)} ${to}`;
  } else {
    resultDisplay.textContent = 'Result: (conversion not implemented yet)';
  }
}

inputValue.addEventListener('input', updateResult);
fromSelect.addEventListener('change', updateResult);
toSelect.addEventListener('change', updateResult);

// Initialize default
populateUnits('length');

