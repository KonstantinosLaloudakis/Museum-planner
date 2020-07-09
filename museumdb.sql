-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: 127.0.0.1
-- Χρόνος δημιουργίας: 09 Ιουλ 2020 στις 17:07:38
-- Έκδοση διακομιστή: 10.4.11-MariaDB
-- Έκδοση PHP: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `museumdb`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--

CREATE TABLE `users` (
  `user_id` int(50) NOT NULL,
  `name` varchar(40) NOT NULL,
  `surname` varchar(40) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varchar(120) NOT NULL,
  `birthday` date NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `users`
--

INSERT INTO `users` (`user_id`, `name`, `surname`, `email`, `password`, `birthday`, `username`) VALUES
(4, 'Kapoios', 'Kapoiou', 'kati@kati.kati', 'kati', '2020-06-02', 'kati'),
(5, 'Mikros', 'Thanasakis', 'kapoios@kapoiou.gr', 'kati', '2020-06-20', 'kawasakhs'),
(6, 'Megalos', 'Thanasakis', 'kati@kati.kati', 'kati', '2020-06-20', 'githubakhs');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `user_rooms`
--

CREATE TABLE `user_rooms` (
  `user_rooms_id` int(50) NOT NULL,
  `name` varchar(40) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `user_rooms`
--

INSERT INTO `user_rooms` (`user_rooms_id`, `name`, `user_id`) VALUES
(3, 'museum', 6),
(4, 'makis', 6),
(7, 'kyj', 6),
(32, 'test', 4);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `visitors`
--

CREATE TABLE `visitors` (
  `visitors_id` int(255) NOT NULL,
  `path` varchar(1000) NOT NULL,
  `number_visitors` int(100) NOT NULL,
  `room_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `visitors`
--

INSERT INTO `visitors` (`visitors_id`, `path`, `number_visitors`, `room_id`) VALUES
(48, '1,2,3,4,5', 6, 32);

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Ευρετήρια για πίνακα `user_rooms`
--
ALTER TABLE `user_rooms`
  ADD PRIMARY KEY (`user_rooms_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Ευρετήρια για πίνακα `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`visitors_id`),
  ADD KEY `room_id` (`room_id`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT για πίνακα `user_rooms`
--
ALTER TABLE `user_rooms`
  MODIFY `user_rooms_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT για πίνακα `visitors`
--
ALTER TABLE `visitors`
  MODIFY `visitors_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `user_rooms`
--
ALTER TABLE `user_rooms`
  ADD CONSTRAINT `user_rooms_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Περιορισμοί για πίνακα `visitors`
--
ALTER TABLE `visitors`
  ADD CONSTRAINT `room_id` FOREIGN KEY (`room_id`) REFERENCES `user_rooms` (`user_rooms_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
