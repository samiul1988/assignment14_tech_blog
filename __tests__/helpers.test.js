const { format_date, is_array, has_array_elements, toggle_label, toggle_link, is_same } = require('../utils/helpers');

test('format_date() returns a date string', () => {
  const date = new Date('2021-05-25 18:11:10');

  expect(format_date(date)).toBe('5/25/2021');
});

test('is_array() returns true if the input is an array', () => {
    const arr = [1, 2, 3];
    const var_not_arr = "not an array";
  
    expect(is_array(arr)).toBe(true);
    expect(is_array(var_not_arr)).toBe(false);
});

test('has_array_elements() returns true if the input array has one or more elements', () => {
    const arr_with_element = [1, 2, 3];
    const arr_with_no_element = [];
  
    expect(has_array_elements(arr_with_element)).toBe(true);
    expect(has_array_elements(arr_with_no_element)).toBe(false);
});

test('toggle_label() toggles input between "Login" and any other text', () => {
    expect(toggle_label("Login")).toBe("Sign up");
    expect(toggle_label("Sign up")).toBe("Login");
});

test('toggle_link() returns "/signup" if the input is "Login" and "/login" for other inputs', () => {
    expect(toggle_link("Login")).toBe("/signup");
    expect(toggle_link("Sign up")).toBe("/login");
});

test('is_same() returns true if inputs are same', () => {
    expect(is_same("Abc", "Abc")).toBe(true);
    expect(is_same("Abc", "abc")).toBe(false);
});

