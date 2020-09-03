-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2020 at 10:24 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_created_at`, `category_updated_at`) VALUES
(1, 'Drinks', '2020-08-12 13:08:19', '0000-00-00 00:00:00'),
(3, 'Desserts', '2020-08-13 03:55:51', '0000-00-00 00:00:00'),
(4, 'Foods', '2020-08-13 03:56:17', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `history_invoice` int(6) NOT NULL,
  `history_subtotal` int(15) NOT NULL,
  `history_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`history_id`, `history_invoice`, `history_subtotal`, `history_created_at`) VALUES
(61, 946643, 227700, '2019-08-17 00:49:10'),
(62, 188569, 195800, '2020-08-17 00:50:35'),
(63, 920857, 821700, '2020-08-17 00:51:39'),
(66, 462616, 138600, '2020-08-25 01:08:02'),
(67, 650349, 77000, '2020-08-25 06:27:40'),
(71, 888586, 55000, '2020-08-26 02:24:21'),
(72, 775143, 92400, '2020-08-26 02:30:14'),
(73, 310108, 11000, '2020-08-26 06:00:14'),
(74, 105066, 94600, '2020-08-26 03:04:29'),
(75, 111287, 66000, '2020-08-26 06:05:55'),
(76, 534902, 79200, '2020-08-26 10:01:58'),
(77, 384367, 88000, '2020-08-27 05:31:22'),
(78, 790071, 103400, '2020-08-27 13:30:09'),
(79, 203949, 74800, '2020-08-27 23:29:42'),
(80, 764016, 96800, '2020-08-31 07:25:56'),
(81, 424999, 97900, '2020-08-31 07:33:22'),
(82, 637997, 50600, '2020-08-31 07:34:50'),
(83, 345874, 74800, '2020-08-31 07:37:50'),
(84, 223321, 69300, '2020-08-31 07:38:30'),
(85, 813782, 150700, '2020-08-31 07:42:26'),
(86, 829902, 105600, '2020-08-31 07:50:40'),
(87, 472676, 283800, '2020-08-31 07:51:16'),
(88, 217413, 53900, '2020-08-31 07:54:03'),
(89, 700656, 102300, '2020-08-31 07:54:52'),
(90, 443897, 111100, '2020-08-31 07:58:24'),
(91, 852987, 215600, '2020-08-31 08:01:13'),
(92, 208209, 11000, '2020-09-01 02:41:17'),
(94, 269168, 154000, '2020-09-02 08:50:32');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_qty` int(6) NOT NULL,
  `order_total_price` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `history_id`, `product_id`, `order_qty`, `order_total_price`) VALUES
(96, 61, 10, 3, 207000),
(97, 62, 6, 6, 168000),
(98, 62, 4, 2, 10000),
(99, 63, 1, 9, 90000),
(100, 63, 3, 7, 105000),
(101, 63, 10, 8, 552000),
(106, 66, 5, 2, 66000),
(107, 66, 7, 2, 60000),
(108, 67, 4, 2, 10000),
(109, 67, 7, 2, 60000),
(110, 71, 1, 2, 20000),
(111, 71, 3, 2, 30000),
(112, 72, 10, 1, 69000),
(113, 72, 4, 3, 15000),
(114, 73, 1, 1, 10000),
(115, 74, 7, 1, 30000),
(116, 74, 6, 2, 56000),
(117, 75, 1, 3, 30000),
(118, 75, 3, 2, 30000),
(119, 76, 6, 2, 56000),
(120, 76, 15, 2, 16000),
(121, 77, 1, 2, 20000),
(122, 77, 3, 2, 30000),
(123, 77, 7, 1, 30000),
(124, 78, 5, 2, 66000),
(125, 78, 6, 1, 28000),
(126, 79, 15, 1, 8000),
(127, 79, 8, 1, 60000),
(128, 80, 7, 2, 60000),
(129, 80, 6, 1, 28000),
(130, 81, 5, 1, 33000),
(131, 81, 6, 2, 56000),
(132, 82, 5, 1, 33000),
(133, 82, 4, 1, 5000),
(134, 82, 15, 1, 8000),
(135, 83, 8, 1, 60000),
(136, 83, 15, 1, 8000),
(137, 84, 5, 1, 33000),
(138, 84, 7, 1, 30000),
(139, 85, 15, 1, 8000),
(140, 85, 10, 1, 69000),
(141, 85, 9, 1, 60000),
(142, 86, 5, 2, 66000),
(143, 86, 7, 1, 30000),
(144, 87, 9, 2, 120000),
(145, 87, 10, 2, 138000),
(146, 88, 5, 1, 33000),
(147, 88, 15, 2, 16000),
(148, 89, 5, 1, 33000),
(149, 89, 9, 1, 60000),
(150, 90, 15, 1, 8000),
(151, 90, 8, 1, 60000),
(152, 90, 5, 1, 33000),
(153, 91, 15, 1, 8000),
(154, 91, 8, 1, 60000),
(155, 91, 5, 1, 33000),
(156, 91, 7, 3, 90000),
(157, 91, 4, 1, 5000),
(158, 92, 4, 2, 10000),
(159, 94, 1, 2, 20000),
(160, 94, 8, 2, 120000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_price` int(15) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `product_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_image`, `product_price`, `category_id`, `product_created_at`, `product_updated_at`, `product_status`) VALUES
(1, 'Espresso', '2020-09-02T11-10-15.238Z-esspresso.jpg', 10000, 1, '2020-08-12 15:15:23', '2020-09-02 11:10:15', 1),
(3, 'Coffee Latte', '2020-09-02T11-10-34.945Z-coflat.jpg', 15000, 1, '2020-08-13 07:01:26', '2020-09-02 11:10:34', 1),
(4, 'Cappuccino', '2020-09-02T11-12-13.684Z-cappucinno.jpg', 5000, 1, '2020-08-13 07:01:41', '2020-09-02 11:12:13', 1),
(5, 'Red Velvet Latte', '2020-09-02T11-12-47.770Z-redvel.jpg', 33000, 1, '2020-08-13 07:02:12', '2020-09-02 11:12:47', 1),
(6, 'Choco Rum', '2020-09-02T11-13-09.735Z-chorum.jpg', 28000, 3, '2020-08-13 07:02:28', '2020-09-02 11:13:09', 1),
(7, 'Black Forest', '2020-09-02T11-13-36.704Z-blkfor.jpg', 30000, 3, '2020-08-13 07:03:48', '2020-09-02 11:13:36', 1),
(8, 'Chicken Katsu Dabu-dabu', '2020-09-02T11-14-20.354Z-katsu.jpg', 60000, 4, '2020-08-13 07:04:07', '2020-09-02 11:14:20', 1),
(9, 'Salmon Truffle Teriyaki', '2020-09-02T11-14-44.144Z-saltruf.jpg', 60000, 4, '2020-08-13 07:04:22', '2020-09-02 11:14:44', 1),
(10, 'Wiener Schnitzel', '2020-09-02T11-15-04.779Z-wien.jpg', 69000, 4, '2020-08-13 07:04:35', '2020-09-02 11:15:04', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_role` int(1) NOT NULL,
  `user_status` int(1) NOT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_password`, `user_name`, `user_role`, `user_status`, `user_created_at`, `user_updated_at`) VALUES
(1, 'nurfauzangiri@gmail.com', '$2b$10$6XijeCpXNdo5gnD1T4sklef8x5XOJTQljNvUOQpyjP32chczwLfg2', 'Giri', 1, 1, '2020-09-02 06:43:57', '0000-00-00 00:00:00'),
(2, 'girisaidn@gmail.com', '$2b$10$eEKKWyvSjqBH7hKtgUkYaunhzjnLFDuXaScVTlSwy11lcAIdhWCpi', 'Said', 2, 1, '2020-09-02 08:28:15', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
