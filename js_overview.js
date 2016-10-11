Primitive types
  Number, String, Boolean

Arrays
  objects with special functionality

Functions
  the name of a function is a pointer
  functions are stored in the ram's Text area

Constructors
  Used to initialize objects, but actually create the properties

Regex:
  abcd    searches for the sequence 'abcd'
  [abcd]  searches for any of 'a', 'b', 'c', or 'd'
  [a-z]   searches for any character from a to z
  [^a-z]  searches for any character besides a-z

  {}  - quantifiers
  * - zero or more
  + - one or more
  ? - zero or one

  ^ - means BEGINNING when not inside square brackets
  $ - means END when not inside square brackets

  /^Lee/      - Matches 'Lee Ann',      but not 'Mary Lee Ann'
  /Lee Ann$/  - Matches 'Mary Lee Ann', but not 'Lee Ann is nice'

  /n/g - matches all instances of n, rather than the first
