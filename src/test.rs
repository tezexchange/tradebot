#[macro_use]
extern crate lazy_static;
extern crate blake2;

use blake2::{Blake2b, Digest};
use std::sync::Mutex;
use std::fmt;
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

struct Point {
    x: i32,
    y: i32,
}
impl Point {
    fn up(&mut self) {
        self.y += 1;
    }
}

lazy_static! {
  static ref p : Mutex<Point> = Mutex::new(Point {x: 0, y: 0});
}

#[no_mangle]
pub fn up() {
  p.lock().unwrap().up();
}

#[no_mangle]
pub fn show() -> i32 {
  p.lock().unwrap().y
}

#[wasm_bindgen]
pub fn test(val : i32) -> i32 {
  if val == 3 {
    0
  } else {
    1
  }
}

#[wasm_bindgen]
pub fn hash() -> String {
  // let mut hasher = Blake2b::new();

  // hasher.input(b"hello world");

  // format!("{:x}", hasher.result())
  "dfdg1d".to_string()
}