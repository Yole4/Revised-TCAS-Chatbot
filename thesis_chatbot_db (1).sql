-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2024 at 02:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thesis_chatbot_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `archive_files`
--

CREATE TABLE `archive_files` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_title` varchar(255) NOT NULL,
  `members` text NOT NULL,
  `department` varchar(50) NOT NULL,
  `course` varchar(50) NOT NULL,
  `school_year` varchar(10) NOT NULL,
  `image_banner` varchar(255) NOT NULL,
  `abstract` text NOT NULL,
  `page_number` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Published',
  `confirmation` int(11) NOT NULL COMMENT '1 = approved, 0 = unapproved',
  `request_name` varchar(255) NOT NULL,
  `date` varchar(50) NOT NULL,
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `archive_files`
--

INSERT INTO `archive_files` (`id`, `user_id`, `project_title`, `members`, `department`, `course`, `school_year`, `image_banner`, `abstract`, `page_number`, `file_path`, `status`, `confirmation`, `request_name`, `date`, `isDelete`) VALUES
(40, 1, 'Thesis And Capstone Archiving System With Integrated Knowledge-based Referencing Chatbot', 'Jhon Doe, Albert Einstein, Mark Zuckerberg', 'College Of Arts And Sciences', 'Bachelor of Science in Computer Science', '2023-2024', 'assets/banner image/1707311621833_+_1704895845582_+_411656129_1020604912345323_4628328649996171119_n.png', 'In today\'s fast - changing academic digital environment, archiving systems are essential, particularly given the exponential rise in specialized knowledge in domains like thesis and capstone projects. These initiatives preserve arduous investigations and ground - breaking ideas as the foundational archives for original research. They serve as comprehensive, cross - disciplinary knowledge stores. These perfectly organized archives serve as a tribute to the commitment and rigo rous thought that went into their construction, and they stand as a symbol of a collective effort to expand knowledge and foster novel ideas and innovations. Final year student theses are stored in a specific room, organized on book racks without clear cat egories, authors, courses, or titles. Softcopies are burned into Compact Discs and also stored there. This manual system makes it challenging for junior students to locate desired theses, with potential for human error leading to disorder. Insufficient inf ormation on covers and compact disks further complicates retrieval. Compact disks are also susceptible to damage or theft. Ensuring thesis integrity is crucial for future reference. Time constraints further hinder access. Students lack continuous availabil ity to visit the thesis room (Ismail, 2013). As stated by Sengupta (2014), i n spite of being a main source of scholarly communication, the print theses and dissertations is mostly not accessible to outside world. In this way, the important information rema ins unused and unknown to users.', 1, 'assets/archive files/1707311584279_+_1697815706428_+_revision.pdf', 'Published', 1, 'Mr. Admin', 'February 7, 2024 at 9:13 PM', 'not'),
(41, 11, 'Resume Generator', 'Jhon Doe', 'College of Computing Studies', 'Bachelor of Science in Information Technology', '2023-2024', 'assets/banner image/1707311766776_+_1704962117408_+_Screenshot (7).png', 'xiii Dedication v Acknowledgement vi Table of Contents vii List of Tables xi List of Figures xii CHAPTER 1 THE PROBLEM AND ITS SCOPE Introduction 1-2 Theoretical/Conceptual Framework 2-6 The Schema of the Study 6-8 Statement of the Problem 9 Significance of the Study 9 Scope and Delimitation 10-11 Operational Definitions of Terms 11-12 CHAPTER 2 LITERATURE AND STUDIES Literature 13-21 Studies 21-28', 7, 'assets/archive files/1707311757770_+_INTELLIGENT IP LOCATOR VIA GOOGLE MAP.pdf', 'Published', 1, 'Paglinawan, Shelo M.', 'February 7, 2024 at 9:16 PM', 'not'),
(42, 22, 'Facebook', 'Mark Zuckerberg, Albert Eistein, Larry Page, Sergey Brin', 'College of Computing Studies', 'Bachelor of Science in Information Technology', '2023-2024', 'assets/banner image/1707312044149_+_1704870038574_+_download.jpeg', 'Created in 2004 by Mark Zuckerberg with four other Harvard College students and roommates Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes, its name derives from the face book directories often given to American university students .', 1, 'assets/archive files/1707312038984_+_Abstract.pdf', 'Published', 1, 'Shelo Paglinawan', 'February 7, 2024 at 9:20 PM', 'not'),
(43, 1, 'JRMSU Research Development and Extension Portal With Plagiarism Detector', 'Armando Saguin', 'College of Computing Studies', 'Bachelor of Science in Computer Science', '2023-2024', 'assets/banner image/1707312662366_+_1704183716376_1345811b-a96b-417d-892f-998e3c7b0103.png', 'Created in 2004 by Mark Zuckerberg with four other Harvard College students and roommates Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes, its name derives from the face book directories often given to American university students .', 1, 'assets/archive files/1707312555685_+_Abstract.pdf', 'Published', 1, 'Mr. Admin', 'February 7, 2024 at 9:31 PM', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `chatbot`
--

CREATE TABLE `chatbot` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_message` text NOT NULL,
  `response` text NOT NULL,
  `project_id` int(11) NOT NULL,
  `isDelete` varchar(50) NOT NULL DEFAULT 'not',
  `date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chatbot`
--

INSERT INTO `chatbot` (`id`, `user_id`, `user_message`, `response`, `project_id`, `isDelete`, `date`) VALUES
(276, 1, 'hi', 'Hello! How can I assist you today?', 0, 'not', 'February 7, 2024 at 9:00 PM'),
(277, 1, 'can you help me today?', 'Of course, I\'d be happy to help.What do you need assistance with?', 0, 'not', 'February 7, 2024 at 9:22 PM'),
(278, 1, 'what is tcas chatbot anyway?', 'TCAS means Thesis and capstone archiving system with integrated knowledge-based referencing chatbot.', 0, 'not', 'February 7, 2024 at 9:22 PM'),
(279, 1, 'fuck you ka', 'Sorry, But I\'m unable to provide or discuss content that includes inappropriate or offensive language.', 0, 'not', 'February 7, 2024 at 9:24 PM'),
(280, 1, 'sldkfjdslkfjsdflkjk', 'I\'m sorry, I didn\'t quite understand that. Can you please rephrase or ask another question?', 0, 'not', 'February 7, 2024 at 9:25 PM'),
(281, 1, 'can you sing with me?', 'I\'m sorry, I didn\'t quite understand that. Can you please rephrase or ask another question?', 0, 'not', 'February 7, 2024 at 9:25 PM'),
(282, 1, 'what is your knowledge?', 'My current knowledge as of now are limited to understanding research-related terms, specifically in the context of my project titled \'Thesis and Capstone Archiving System with an Integrated Knowledge-Based Referencing Chatbot,\' and providing simple greetings. I\'m still a work in progress, but in the future, I aim to offer a broader range of knowledge and assistance based on the documents uploaded to my system.', 0, 'not', 'February 7, 2024 at 9:25 PM'),
(283, 1, 'what is plagiarism detector?', 'Plagiarism checkers are software that can be used to cross-check text for duplicated content (this may include quoted material, paraphrased material, similarities in wording, etc.). These tools help to ensure that writing is original and correctly cited.', 43, 'not', 'February 7, 2024 at 9:31 PM');

-- --------------------------------------------------------

--
-- Table structure for table `chatbot_keywords`
--

CREATE TABLE `chatbot_keywords` (
  `id` int(11) NOT NULL,
  `keyword` varchar(255) NOT NULL,
  `information` text NOT NULL,
  `project_id` int(11) NOT NULL,
  `date` varchar(50) NOT NULL,
  `status` int(11) NOT NULL COMMENT '1 => approved, 0 => unApproved',
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chatbot_keywords`
--

INSERT INTO `chatbot_keywords` (`id`, `keyword`, `information`, `project_id`, `date`, `status`, `isDelete`) VALUES
(1, 'Undefine', 'I\'m sorry, I didn\'t quite understand that. Can you please rephrase or ask another question?', 0, 'January 10, 2024 at 3:15 PM', 1, 'not'),
(7, 'sdfs sdf sdf sdf sdf sdf', 'I\'m sorry, I didn\'t quite understand that. Can you please rephrase or ask another question?', 0, 'January 10, 2024 at 3:15 PM', 0, 'not'),
(8, 'What is Archiving System?', 'Archiving System is a platform designed to systematically collect, organize, store, and provide access to a compiled collection of thesis and capstone projects. The system incorporates features for document submission, metadata management, user-friendly search and retrieval, quality assurance, and integration with a knowledge-base and chatbot. Its objective is to enhance research accessibility and user experience by offering a centralized repository of academic works while being efficient document discovery and referencing.', 0, '', 1, 'Deleted'),
(9, 'What is Expert System?', 'Expert system is a computer program developed using artificial intelligence concepts and technologies. It mimics the decision-making capabilities of human experts within a limited domain, such as providing financial forecasts or assisting with specific tasks.', 0, '', 0, 'not'),
(10, 'How can I contact you?', 'Follow this steps: Open this link https://tcas-with-integrated-knowledge-based.onrender.com. After opened the link go to about-us Find contact info like email or number Good Luck!', 0, '', 0, 'not'),
(11, 'What is the meaning of TCAS chatbot?', 'TCAS means Thesis and capstone archiving system with integrated knowledge-based referencing chatbot', 0, '', 0, 'not'),
(12, 'Hi hello how are you?', 'Hello! How can I assist you today?', 0, '', 1, 'Deleted'),
(18, 'random question', 'this is the random response', 38, 'January 10, 2024 at 10:44 PM', 1, 'Deleted'),
(19, 'repeat me', 'me me me', 38, 'January 10, 2024 at 10:44 PM', 1, 'Deleted'),
(20, 'what to revise on admin side?', 'o	Validate the user uploads, Accept/ Reject\r\no	Approve the user requests to view files', 39, 'January 11, 2024 at 4:35 PM', 1, 'Deleted'),
(21, 'what to revise on user', 'o	Allowed to upload documents (para dili ma bug-atan ang admin)\r\no	Upon making the upload users will have something to fill up in uploading the file ', 39, 'January 11, 2024 at 4:35 PM', 1, 'Deleted'),
(22, 'Uploading the Files by the Users or admin', '•	The user has the access to submit thesis documents but still they need to fill up something maybe an info about their study (sabutan pa what could it be)\r\n•	Once filled up, they’ll have another na fill up pan for the chatbot (kibale this one will be propably consider as a knowledge for the chatbot, including the keywords as what sir stated)\r\n', 39, 'January 11, 2024 at 4:35 PM', 1, 'Deleted'),
(23, 'on chatbot side what are those panel suggestions?', '•	Create a database for this daw \r\n•	Information for the document (the one na I input)\r\n•	Reinforcement Learning (Supervise Learning) – ikaw ang mag input or users for something na imong i feed niya \r\n•	Explain how daw pag pull out sa mismong document,files\r\n\r\nWe will create a diagram for the CHATBOT pud daw (Maybe how it works what’s the process niya)\r\nAdditionally, IN THE CHATBOT DAW MAG MONITOR DAW SIYA SA BEHAVIOR SA USER (dapat if that’s the study na focus ra niya diha ra siya dili kay maabot pa siya ug lain na field ug sinearch daw kay it’s kinda suspicious na)\r\n', 39, 'January 11, 2024 at 4:35 PM', 1, 'Deleted'),
(24, 'what is the panel\'s suggestions on database?', '•	Must have an access code (expire maybe after an hour)\r\n•	Once user request of the document naa ray limit na time for viewing\r\n', 39, 'January 11, 2024 at 4:35 PM', 1, 'Deleted'),
(25, 'tests', 'tests', 0, 'January 12, 2024 at 1:48 PM', 1, 'Deleted'),
(26, 'other', '1other', 0, 'January 12, 2024 at 1:48 PM', 1, 'Deleted'),
(27, 'What are your capabilities?', 'I\'m designed for a project called \'Thesis and Capstone Archiving System with an Integrated Knowledge-Based Referencing Chatbot.\' At the moment, my capabilities include understanding research-related terms and providing simple greetings. However, I\'m a work in progress, and my future goal is to offer a broader range of knowledge and assistance based on the documents uploaded to my system. Currently, I can provide information, answer questions, and assist with various tasks within the scope of my existing knowledge. Feel free to ask me anything related to my current capabilities!', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(28, 'Thanks', 'You\'re welcome! If you have more questions, feel free to ask.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(29, 'What is your nature or purpose?', 'I\'m a chatbot designed to help you with information and tasks.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(30, 'How are you? hi, hello', 'Hello! How can I assist you today?', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(31, 'What is the meaning of TCAS chatbot?', 'TCAS means Thesis and capstone archiving system with integrated knowledge-based referencing chatbot.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(32, 'What is Archiving System?', 'Archiving System is a platform designed to systematically collect, organize, store, and provide access to a compiled collection of thesis and capstone projects. The system incorporates features for document submission, metadata management, user-friendly search and retrieval, quality assurance, and integration with a knowledge-base and chatbot. Its objective is to enhance research accessibility and user experience by offering a centralized repository of academic works while being efficient document discovery and referencing.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(33, 'What is Expert System?', 'Expert system is a computer program developed using artificial intelligence concepts and technologies. It mimics the decision-making capabilities of human experts within a limited domain, such as providing financial forecasts or assisting with specific tasks.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(34, 'What is Chatbot?', 'Chatbot is a Conversational agents, also known as chatbots or chatterbots, are machine conversation systems designed to interact with human users using natural language. They can be employed for various applications, including customer service in e-commerce', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(35, 'What is Natural Language Processing? (NLP)', 'Natural Language Processing(NLP) is a field of artificial intelligence that focuses on enabling computers to understand, interpret, and generate human language in a valuable way. In the context of this study, NLP capabilities are utilized to enhance user interactions with the archiving system through the chatbot', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(36, 'What is Double Hashing?', 'The double hashing technique is a method for addressing collisions and improving the efficiency of searching in data structures, particularly hash tables. It involves using two hash functions to determine the location for storing and retrieving data.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(37, 'What is Inference Engine?', 'Inference engine is a component of knowledge-based systems responsible for applying rules and drawing conclusions based on the information stored in the knowledge base. It plays a central role in decision-making processes.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(38, 'What is Text Classifier?', 'Text Classifier is an algorithm that helps categorizing and organizing the content of the archived theses and capstone projects automatically. It gives hand to the users to easily locate and access relevant documents based on their research interests, improving their experience in archiving system.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(39, 'What is Hash Table?', 'Hash table is a smart way to organize and quickly find information about the archived theses and capstone projects. It\'s like a well-organized index that makes searching and accessing documents faster and more efficient in your system.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(40, 'What is User Interface?', 'User Interface it is an interactive design and layout that users interact with when accessing the archiving system. It\'s like the user-friendly front door to the system, where users can search for documents, browse categories, and access the archived thesis and capstone projects with easily.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(41, 'What is Thesis?', 'Thesis is a research paper written by students in college or university. It\'s like a deep dive into a specific topic, where the author does research and shares their own insights.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(42, 'What is Capstone?', 'Capstone represents a significant final project or assignment that students complete at the end of their degree program. It\'s a practical application of their learning and often involves solving real-world challenges', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(43, 'What is Repository?', 'Repository is like a digital library where you store and manage the thesis and capstone projects. It\'s a central place for archiving and organizing these academic works, making them accessible to users for research and reference purposes.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(44, 'What is Metadata?', 'Metadata refers to the information that provides details about the theses and capstone projects. It contains information such as the title, author, publication date, and keywords. Metadata helps users find and understand the content within the archiving system more easily.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(45, '\'What is your knowledge?', 'My current knowledge as of now are limited to understanding research-related terms, specifically in the context of my project titled \'Thesis and Capstone Archiving System with an Integrated Knowledge-Based Referencing Chatbot,\' and providing simple greetings. I\'m still a work in progress, but in the future, I aim to offer a broader range of knowledge and assistance based on the documents uploaded to my system.', 0, 'January 12, 2024 at 2:43 PM', 1, 'not'),
(46, 'Good Day', 'Good Day! How may I help you?', 0, 'January 12, 2024 at 5:42 PM', 1, 'not'),
(47, 'How are you feeling?', 'I\'m just a computer program, so I don\'t have feelings, but I\'m here and ready to help. What can I do for you?', 0, 'January 12, 2024 at 5:47 PM', 1, 'not'),
(48, 'What can you do?', 'I\'m designed for a project called \'Thesis and Capstone Archiving System with an Integrated Knowledge-Based Referencing Chatbot.\' At the moment, my capabilities include understanding research-related terms and providing simple greetings. However, I\'m a work in progress, and my future goal is to offer a broader range of knowledge and assistance based on the documents uploaded to my system. Currently, I can provide information, answer questions, and assist with various tasks within the scope of my existing knowledge. Feel free to ask me anything related to my current capabilities!', 0, 'January 12, 2024 at 5:47 PM', 1, 'Deleted'),
(49, 'Tell me about yourself', ' I am a chatbot designed to assist you. My purpose is to provide information and help with a variety of queries.', 0, 'January 12, 2024 at 5:49 PM', 1, 'not'),
(50, 'Help', 'Of course! I\'m here to help. What do you need assistance with?', 0, 'January 12, 2024 at 5:49 PM', 1, 'Deleted'),
(51, 'What\'s up?', ' Not much on my end. How can I assist you today? If you have any questions or need information, feel free to ask.', 0, 'January 12, 2024 at 5:50 PM', 1, 'not'),
(52, 'what can you do?', 'I\'m designed for a project called \'Thesis and Capstone Archiving System with an Integrated Knowledge-Based Referencing Chatbot.\' At the moment, my capabilities include understanding research-related terms and providing simple greetings. However, I\'m a work in progress, and my future goal is to offer a broader range of knowledge and assistance based on the documents uploaded to my system. Currently, I can provide information, answer questions, and assist with various tasks within the scope of my existing knowledge. Feel free to ask me anything related to my current capabilities!', 0, 'January 12, 2024 at 5:59 PM', 1, 'Deleted'),
(53, 'Can you help me?', 'Of course, I\'d be happy to help.What do you need assistance with?', 0, 'January 12, 2024 at 6:02 PM', 1, 'not'),
(54, 'shelo\'s girlfriend', 'Shelo\'s girlfriend is Mara Cris Lumactod Ugdal', 0, 'January 24, 2024 at 11:56 PM', 1, 'Deleted'),
(55, 'who is mara cris in shelo\'s life?', 'mara cris or mara cris lumactod ugdal is the girlfriend of shelo paglinawan which is the one who create this system!', 0, 'January 24, 2024 at 11:58 PM', 1, 'Deleted'),
(56, 'sample', 'sample', 40, 'February 7, 2024 at 9:13 PM', 1, 'Deleted'),
(57, 'sdf', 'sd', 41, 'February 7, 2024 at 9:16 PM', 1, 'Deleted'),
(58, 'sf', 'sdf', 42, 'February 7, 2024 at 9:20 PM', 1, 'not'),
(59, 'what is RDEPPD?', 'Research Development And Extension Portal With Plagiarism Detector', 43, 'February 7, 2024 at 9:31 PM', 1, 'not'),
(60, 'what is plagiarism Detector?', 'Plagiarism checkers are software that can be used to cross-check text for duplicated content (this may include quoted material, paraphrased material, similarities in wording, etc.). These tools help to ensure that writing is original and correctly cited.', 43, 'February 7, 2024 at 9:31 PM', 1, 'not');

-- --------------------------------------------------------

--
-- Table structure for table `code_verification`
--

CREATE TABLE `code_verification` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `code_verification`
--

INSERT INTO `code_verification` (`id`, `email`, `code`) VALUES
(7, '0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlR2VuZXJhdGVkIjo1MjQ5OTA3LCJpYXQiOjE3MDUwNzAzOTMsImV4cCI6MTcwNTA3MDY5M30.KS_NFGuN5w7_GJ9UfRsosSBl1M__DAgiBWowlA7d0qw'),
(8, 'shelomora60@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlR2VuZXJhdGVkIjozMTk5MDMxLCJpYXQiOjE3MDUwNzA5NDMsImV4cCI6MTcwNTA3MTI0M30.LoU0eeDvjgYJZnxags-laSEASEfiPP1twf4WHjebUxY'),
(9, 'shelomora61@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlR2VuZXJhdGVkIjozNjg0MDk5LCJpYXQiOjE3MDUwNzI0NzUsImV4cCI6MTcwNTA3Mjc3NX0.1zfz2mgxgnX-wkLIuZWt5HOQe5V41XmUywGbeBArmXQ'),
(10, 'shelomora13@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlR2VuZXJhdGVkIjoxMTc3NjA5LCJpYXQiOjE3MDUwNzU3MzEsImV4cCI6MTcwNTA3NjAzMX0.9-sAt0mjJq71K-71231BwhRcfRT1YvQmtqMOAH_nULY'),
(11, 'shelomora63@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlR2VuZXJhdGVkIjo4NTQwOTA0LCJpYXQiOjE3MDU1NTQ0MzUsImV4cCI6MTcwNTU1NDczNX0.HrhSPF28Zmst8lOq6GA5Eh_tlNgkE9JWJTXgaNNHUaE');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `course` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL,
  `acronym` varchar(20) NOT NULL,
  `date` varchar(50) NOT NULL,
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course`, `status`, `acronym`, `date`, `isDelete`) VALUES
(16, 'Bachelor of Science in Computer Science', 'Active', 'BSCS', 'February 7, 2024 at 9:01 PM', 'not'),
(17, 'Bachelor of Science in Information Technology', 'Active', 'BSIT', 'February 7, 2024 at 9:01 PM', 'not'),
(18, 'Bachelor of Science in Electrical Engeneering', 'Active', 'BSEE', 'February 7, 2024 at 9:01 PM', 'not'),
(19, 'Bachelor of Science in Marine Biology', 'Active', 'BSMB', 'February 7, 2024 at 9:02 PM', 'not'),
(20, 'Bachelor of Science in Financial Management', 'Inactive', 'BSFM', 'February 7, 2024 at 9:02 PM', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `date` varchar(50) NOT NULL,
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `status`, `description`, `date`, `isDelete`) VALUES
(23, 'College Of Arts And Sciences', 'Active', 'Description', 'February 7, 2024 at 9:05 PM', 'not'),
(24, 'College of Computing Studies', 'Active', 'Description', 'February 7, 2024 at 9:05 PM', 'not'),
(25, 'other', 'Inactive', 'description', 'February 7, 2024 at 9:06 PM', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `notification_type` varchar(50) NOT NULL,
  `content` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `date` varchar(50) NOT NULL,
  `seen` int(11) NOT NULL DEFAULT 0,
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `notification_type`, `content`, `url`, `date`, `seen`, `isDelete`) VALUES
(248, 1, 'Course', 'You have been successfully added Bachelor of Science in Computer Science from the course list.', '', 'February 7, 2024 at 9:01 PM', 0, 'not'),
(249, 1, 'Course', 'You have been successfully added Bachelor of Science in Information Technology from the course list.', '', 'February 7, 2024 at 9:01 PM', 0, 'not'),
(250, 1, 'Course', 'You have been successfully added Bachelor of Science in Electrical Engeneering from the course list.', '', 'February 7, 2024 at 9:01 PM', 0, 'not'),
(251, 1, 'Course', 'You have been successfully added Bachelor of Science in Marine Biology from the course list.', '', 'February 7, 2024 at 9:02 PM', 0, 'not'),
(252, 1, 'Course', 'You have been successfully added Bachelor of Science in Financial Management from the course list.', '', 'February 7, 2024 at 9:02 PM', 0, 'not'),
(253, 1, 'School Year', 'You\'ve been successfully added 2023-2024', '', 'February 7, 2024 at 9:03 PM', 0, 'not'),
(254, 1, 'School Year', 'You\'ve been successfully added 2024-2025', '', 'February 7, 2024 at 9:03 PM', 0, 'not'),
(255, 1, 'School Year', 'You\'ve been successfully added 2025-2026', '', 'February 7, 2024 at 9:03 PM', 0, 'not'),
(256, 1, 'School Year', 'You\'ve been successfully added 2026-2027', '', 'February 7, 2024 at 9:03 PM', 0, 'not'),
(257, 1, 'Department', 'You have been successfully added CAS on Department List.', '', 'February 7, 2024 at 9:05 PM', 0, 'not'),
(258, 1, 'Department', 'You have been successfully added CCS on Department List.', '', 'February 7, 2024 at 9:05 PM', 0, 'not'),
(259, 1, 'Department', 'You have been successfully added other on Department List.', '', 'February 7, 2024 at 9:06 PM', 0, 'not'),
(260, 1, 'Department', 'College Of Arts And Sciences was been updated!', '', 'February 7, 2024 at 9:07 PM', 0, 'not'),
(261, 1, 'Department', 'College of Computing Studies was been updated!', '', 'February 7, 2024 at 9:07 PM', 0, 'not'),
(262, 1, 'Add Project', 'You\'ve successfully added Thesis And Capstone Archiving System With Integrated Knowledge-based Referencing Chatbot to archive', '', 'February 7, 2024 at 9:13 PM', 0, 'not'),
(263, 11, 'Add Project', 'Resume Generator status pending', '', 'February 7, 2024 at 9:16 PM', 0, 'not'),
(264, 1, 'Request Project', 'Paglinawan, Shelo M. requested to upload new document', '41', 'February 7, 2024 at 9:16 PM', 0, 'not'),
(265, 11, 'Accept Request', 'Your Request on Resume Generator has been approved by admin!', '', 'February 7, 2024 at 9:16 PM', 0, 'not'),
(266, 22, 'Add Project', 'Facebook status pending', '', 'February 7, 2024 at 9:20 PM', 0, 'not'),
(267, 1, 'Request Project', 'Shelo Paglinawan requested to upload new document', '42', 'February 7, 2024 at 9:20 PM', 0, 'not'),
(268, 22, 'Accept Request', 'Your Request on Facebook has been approved by admin!', '', 'February 7, 2024 at 9:21 PM', 0, 'not'),
(269, 1, 'Users', 'You\'ve been successfully deleted eloythe@gmail.com account.', '', 'February 7, 2024 at 9:22 PM', 0, 'not'),
(270, 1, 'Users', 'You\'ve been successfully deleted sdfsdf@sdfsdf account.', '', 'February 7, 2024 at 9:22 PM', 0, 'not'),
(271, 1, 'Users', 'You\'ve been successfully deleted jrmu@gmail.com account.', '', 'February 7, 2024 at 9:22 PM', 0, 'not'),
(272, 1, 'Users', 'You\'ve been successfully deleted eloy@gmail.com account.', '', 'February 7, 2024 at 9:22 PM', 0, 'not'),
(273, 1, 'Users', 'You\'ve been successfully deleted eloyss@gmail.com account.', '', 'February 7, 2024 at 9:22 PM', 0, 'not'),
(274, 1, 'Add Project', 'You\'ve successfully added JRMSU Research Development and Extension Portal With Plagiarism Detector to archive', '', 'February 7, 2024 at 9:31 PM', 0, 'not');

-- --------------------------------------------------------

--
-- Table structure for table `school_year`
--

CREATE TABLE `school_year` (
  `id` int(11) NOT NULL,
  `school_year` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `date` varchar(50) NOT NULL,
  `isDelete` varchar(10) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `school_year`
--

INSERT INTO `school_year` (`id`, `school_year`, `status`, `date`, `isDelete`) VALUES
(9, '2023-2024', 'Active', 'February 7, 2024 at 9:03 PM', 'not'),
(10, '2024-2025', 'Active', 'February 7, 2024 at 9:03 PM', 'not'),
(11, '2025-2026', 'Active', 'February 7, 2024 at 9:03 PM', 'not'),
(12, '2026-2027', 'Inactive', 'February 7, 2024 at 9:03 PM', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `system_name` varchar(255) NOT NULL,
  `system_short_name` varchar(50) NOT NULL,
  `welcome_content` text NOT NULL,
  `about_us` text NOT NULL,
  `system_logo` varchar(100) NOT NULL,
  `system_cover` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact_number` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `system_name`, `system_short_name`, `welcome_content`, `about_us`, `system_logo`, `system_cover`, `email`, `contact_number`, `address`, `date`) VALUES
(1, 'Thesis And Capstone Archiving System With Integrated Knowledge-based Referencing Chatbot', 'JRMSU', 'Welcome to the future of academic research and writing with our cutting-edge \"Thesis and Capstone Archiving System with Integrated Knowledge-Based Referencing Chatbot.\" This revolutionary platform empowers you to explore a vast repository of academic theses and capstone projects, while our intelligent chatbot stands ready to assist you in citing and referencing sources with precision. Whether you\'re a student or a researcher, this integrated system is your gateway to a seamless, efficient, and academically rigorous journey. Discover a world of knowledge at your fingertips, where innovation meets scholarly excellence.', 'Thesis and Capstone Archiving System with Integrated Knowledge-Based Referencing Chatbot,\' we are passionate about revolutionizing the academic research landscape. Our mission is to provide students and researchers with a state-of-the-art platform that simplifies the research process and ensures the highest standards of academic integrity. With a team dedicated to harnessing the power of technology for the benefit of scholars, we\'re committed to fostering innovation, efficiency, and excellence in academic pursuits. Join us in the exciting journey of academic exploration and discover a world of knowledge made accessible like never before.', 'assets/settings image/1704428111476_+_logo.png', 'assets/settings image/1704428115807_+_jose.jpg', 'vpred@gmail.com', '09094991331', 'MC4F+936, Govt. Sta. Cruz, Guading Adasa St, Dapitan City, Zamboanga del Norte', 'November 30, 2023 at 8:05 PM');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `google_id` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_type` varchar(20) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0 = Verified 1 = Not Verified',
  `date` varchar(50) NOT NULL,
  `isDelete` varchar(20) NOT NULL DEFAULT 'not',
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `google_id`, `fullname`, `email`, `username`, `password`, `image`, `user_type`, `status`, `date`, `isDelete`, `first_name`, `middle_name`, `last_name`) VALUES
(1, '', 'Mr. Admin', 'admin@gmail.com', 'admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'assets/image upload/1707310813200_+_download (1).jpeg', 'Admin', 0, '2023-10-14 16:59:05', 'not', '', '', ''),
(2, '', '', '', 'student', '703b0a3d6ad75b649a28adde7d83c6251da457549263bc7ff45ec709b0a8448b', 'assets/image upload/1697788488147_+_393930314_1048323799527338_4713761329989285452_n.png', 'Student', 0, '2023-10-15 14:46:53', 'not', '', '', ''),
(4, '', '', '', 'secret123', 'fcf730b6d95236ecd3c9fc2d92d7b6b2bb061514961aec041d6c7a7192f592e4', 'assets/image upload/given image.png', 'Student', 0, '2023-10-16 14:32:34', 'Deleted', '', '', ''),
(5, '', '', '', 'user123', 'e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446', 'assets/image upload/given image.png', 'Student', 0, '2023-10-20 15:55:53', 'not', '', '', ''),
(6, '', '', '', 'user2', 'b8c871d486f147a9d99be27ab59c64c8781bb53c0472afd9804cbe00e174f648', 'assets/image upload/given image.png', 'Student', 0, '2023-10-22 10:02:44', 'not', '', '', ''),
(7, '', '', '', 'marahoo', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', 'assets/image upload/given image.png', 'Student', 0, '2023-12-06 12:22:44', 'not', '', '', ''),
(8, '', '', '', 'dfsdfadasdad', '7044bb999e1788e1a373de730d5295488402e301e2fc0f790f3602297b9143fe', '', 'User', 0, '2023-12-19 13:58:47', 'not', '', '', ''),
(9, '', '', '', 'fsdfsdfsfdsdf', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', '', 'User', 0, '2023-12-19 13:59:20', 'not', '', '', ''),
(11, '107975095684211413473', 'Paglinawan, Shelo M.', 'shelomora60@gmail.com', '', '7044bb999e1788e1a373de730d5295488402e301e2fc0f790f3602297b9143fe', 'assets/image upload/1707311677148_+_406470226_2299411263590791_2877538603601282725_n.jpg', 'Researcher', 0, '2024-01-02 11:47:47', 'not', '', '', ''),
(12, '', 'Sheloy', 'sheloy@gmail.com', '', '71afe584f2f2d2509423081dc488cc8ef9822b37c2fbf9b860bcb7d5cb594dbd', '', 'Researcher', 0, '2024-01-02 11:59:36', 'Deleted', '', '', ''),
(13, '', 'eloytheeloy', 'eloythe@gmail.com', '', '7044bb999e1788e1a373de730d5295488402e301e2fc0f790f3602297b9143fe', 'assets/image upload/1704180218845_Ede_vZbXsAc8zpM.png', 'Researcher', 0, '2024-01-02 15:23:38', 'Deleted', '', '', ''),
(14, '', 'sdfsdf', 'sdfsdf@sdfsdf', '', '7044bb999e1788e1a373de730d5295488402e301e2fc0f790f3602297b9143fe', 'assets/image upload/1704180829189_Ede_vZbXsAc8zpM.png', 'Researcher', 0, '2024-01-02 15:33:49', 'Deleted', '', '', ''),
(15, '106160325936605557779', 'Shelo Paglinawan', 'shelomora61@gmail.com', '', '7044bb999e1788e1a373de730d5295488402e301e2fc0f790f3602297b9143fe', 'https://lh3.googleusercontent.com/a/ACg8ocKZ6CEqEHB8D31bvBKy6hJ6_tJm4PXIlHhIbMzLBQ_0=s96-c', 'Researcher', 0, '2024-01-02 16:20:32', 'Deleted', '', '', ''),
(16, '', 'jrmu', 'jrmu@gmail.com', '', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'assets/image upload/1704183716376_1345811b-a96b-417d-892f-998e3c7b0103.png', 'Researcher', 0, '2024-01-02 16:21:56', 'Deleted', '', '', ''),
(17, '', 'eloy', 'eloy@gmail.com', '', '7044bb999e1788e1a373de730d5295488402e301e2fc0f790f3602297b9143fe', 'assets/image upload/1704184321426_1345811b-a96b-417d-892f-998e3c7b0103.png', 'Researcher', 0, '2024-01-02 16:32:01', 'Deleted', '', '', ''),
(19, '112525129381523233619', 'shelo mora', 'shelomora13@gmail.com', '', '7044bb999e1788e1a373de730d5295488402e301e2fc0f790f3602297b9143fe', 'https://lh3.googleusercontent.com/a/ACg8ocK3x7GqxuBgI63uzT9ib5ynTn24fnjqlfHHPJc6gPfp=s96-c', 'Researcher', 0, '2024-01-06 13:40:28', 'not', '', '', ''),
(21, '110924822930092299084', 'Shelo Paglinawan', 'shelomora63@gmail.com', '', '7044bb999e1788e1a373de730d5295488402e301e2fc0f790f3602297b9143fe', 'https://lh3.googleusercontent.com/a/ACg8ocKEff714k1COKH25RWgAmmhpxG1zradxq45F9IP4BcJ=s96-c', 'Researcher', 0, '2024-01-07 01:49:52', 'not', '', '', ''),
(22, '106160325936605557779', 'Shelo Paglinawan', 'shelomora61@gmail.com', '', '', 'assets/image upload/1707311942862_+_Ede_vZbXsAc8zpM.png', 'Researcher', 0, '2024-01-07 14:05:33', 'not', '', '', ''),
(23, '', 'eloy', 'eloyss@gmail.com', '', '7044bb999e1788e1a373de730d5295488402e301e2fc0f790f3602297b9143fe', 'assets/image upload/1704607620491_1345811b-a96b-417d-892f-998e3c7b0103.png', 'Researcher', 0, '2024-01-07 14:07:00', 'Deleted', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `user_file_request`
--

CREATE TABLE `user_file_request` (
  `id` int(11) NOT NULL,
  `user_request_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Pending' COMMENT 'Pending or Approved',
  `approved_token` varchar(255) NOT NULL,
  `isDelete` varchar(20) NOT NULL DEFAULT 'not',
  `date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `archive_files`
--
ALTER TABLE `archive_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chatbot`
--
ALTER TABLE `chatbot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chatbot_keywords`
--
ALTER TABLE `chatbot_keywords`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `code_verification`
--
ALTER TABLE `code_verification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_year`
--
ALTER TABLE `school_year`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_file_request`
--
ALTER TABLE `user_file_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relationship_id` (`user_request_id`),
  ADD KEY `relationship_project_id` (`project_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `archive_files`
--
ALTER TABLE `archive_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `chatbot`
--
ALTER TABLE `chatbot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=284;

--
-- AUTO_INCREMENT for table `chatbot_keywords`
--
ALTER TABLE `chatbot_keywords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `code_verification`
--
ALTER TABLE `code_verification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=275;

--
-- AUTO_INCREMENT for table `school_year`
--
ALTER TABLE `school_year`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user_file_request`
--
ALTER TABLE `user_file_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_file_request`
--
ALTER TABLE `user_file_request`
  ADD CONSTRAINT `relationship_id` FOREIGN KEY (`user_request_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `relationship_project_id` FOREIGN KEY (`project_id`) REFERENCES `archive_files` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
