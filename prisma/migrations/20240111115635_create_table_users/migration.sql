-- CreateTable
CREATE TABLE `User` (
    `user_id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `picture` TEXT NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `height` FLOAT NOT NULL,
    `weight` FLOAT NOT NULL,
    `activity` ENUM('sedentary', 'lowActive', 'active', 'veryActive') NOT NULL,
    `food_type` LONGTEXT NULL,
    `created_at` TIMESTAMP(3) NOT NULL,
    `updated_at` TIMESTAMP(3) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
