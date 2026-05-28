-- ============================================================
-- TravelScheduler Database Schema
-- 根據 ER 圖、Relation 圖及實際後端程式碼反推
-- ============================================================

CREATE DATABASE IF NOT EXISTS TravelScheduler
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE TravelScheduler;

-- ────────────────────────────────────────────────────────────
-- USER
-- user_id：以 email 做 HMAC-SHA256 產生，非 AUTO_INCREMENT
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS USER (
  user_id  VARCHAR(100) NOT NULL,
  name     VARCHAR(100) NOT NULL,
  email    VARCHAR(255) NOT NULL,
  photoURL TEXT,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ────────────────────────────────────────────────────────────
-- GROUP
-- creator_id：建立群組的使用者（雖 Relation 圖未列出，但程式碼有用到）
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `GROUP` (
  group_id    VARCHAR(100) NOT NULL,
  name        VARCHAR(255) NOT NULL,
  description TEXT,
  people_num  INT          NOT NULL DEFAULT 0,
  creator_id  VARCHAR(100),
  PRIMARY KEY (group_id),
  CONSTRAINT fk_group_creator FOREIGN KEY (creator_id) REFERENCES USER(user_id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ────────────────────────────────────────────────────────────
-- CONTAIN（USER ↔ GROUP 多對多）
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS CONTAIN (
  user_id  VARCHAR(100) NOT NULL,
  group_id VARCHAR(100) NOT NULL,
  PRIMARY KEY (user_id, group_id),
  CONSTRAINT fk_contain_user  FOREIGN KEY (user_id)  REFERENCES USER(user_id)  ON DELETE CASCADE,
  CONSTRAINT fk_contain_group FOREIGN KEY (group_id) REFERENCES `GROUP`(group_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ────────────────────────────────────────────────────────────
-- TRAVEL
-- group_id / user_id 擇一有值（個人行程 or 群組行程）
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS TRAVEL (
  travel_id   VARCHAR(100) NOT NULL,
  group_id    VARCHAR(100),
  user_id     VARCHAR(100),
  name        VARCHAR(255) NOT NULL,
  date        DATE,
  people_num  INT          NOT NULL DEFAULT 1,
  description TEXT,
  done        BOOLEAN      NOT NULL DEFAULT FALSE,
  PRIMARY KEY (travel_id),
  CONSTRAINT fk_travel_group FOREIGN KEY (group_id) REFERENCES `GROUP`(group_id) ON DELETE SET NULL,
  CONSTRAINT fk_travel_user  FOREIGN KEY (user_id)  REFERENCES USER(user_id)     ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ────────────────────────────────────────────────────────────
-- TAG
-- 注意：程式碼 INSERT INTO TAG VALUE(?,?) 只有 2 個欄位
--       且 HAS 透過 tag_name JOIN TAG.name，所以 name 為 PK
--       （Relation 圖的 tag_id 在實作中未使用）
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS TAG (
  name  VARCHAR(100) NOT NULL,
  color VARCHAR(50)  NOT NULL,
  PRIMARY KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ────────────────────────────────────────────────────────────
-- SPOT
-- spot_id：以 location 做 HMAC-SHA256 產生（相同地點 = 同一筆）
-- 注意：Relation 圖的 tag_id / arrive_id 實際上在 HAS 表，SPOT 本身不存這些
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS SPOT (
  spot_id    VARCHAR(100)   NOT NULL,
  name       VARCHAR(255)   NOT NULL,
  ranking    FLOAT,
  description TEXT,
  longtitude DOUBLE,
  latitude   DOUBLE,
  open_hour  TEXT,
  location   VARCHAR(500)   NOT NULL,
  PRIMARY KEY (spot_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ────────────────────────────────────────────────────────────
-- HAS（TRAVEL ↔ SPOT 多對多，含排序鏈結串列 + 時間 + 交通）
--
-- 重要設計：arrive_id 為自我參照 FK，指向「前一個停留點」的 has_id
--   arrive_id = NULL  → 此景點為行程第一站
--   arrive_id = X     → 前一站是 has_id = X 的景點
-- 這形成一個鏈結串列，決定景點在行程中的順序
--
-- 注意：Relation 圖的 Has 只有 (travel_id, spot_id)，但實作上
--       有獨立的 has_id (UUID) 作為 PK，並包含時間、交通等欄位
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS HAS (
  has_id         VARCHAR(100) NOT NULL,
  travel_id      VARCHAR(100) NOT NULL,
  spot_id        VARCHAR(100) NOT NULL,
  tag_name       VARCHAR(100),
  transportation VARCHAR(50),
  start_time     DATETIME,
  arrive_time    DATETIME,
  arrive_id      VARCHAR(100),              -- 指向前一站 has_id（自我參照）
  PRIMARY KEY (has_id),
  CONSTRAINT fk_has_travel FOREIGN KEY (travel_id) REFERENCES TRAVEL(travel_id) ON DELETE CASCADE,
  CONSTRAINT fk_has_spot   FOREIGN KEY (spot_id)   REFERENCES SPOT(spot_id)     ON DELETE CASCADE,
  CONSTRAINT fk_has_tag    FOREIGN KEY (tag_name)  REFERENCES TAG(name)         ON DELETE SET NULL,
  CONSTRAINT fk_has_arrive FOREIGN KEY (arrive_id) REFERENCES HAS(has_id)       ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ────────────────────────────────────────────────────────────
-- STAR（USER 收藏 SPOT）
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS STAR (
  user_id VARCHAR(100) NOT NULL,
  spot_id VARCHAR(100) NOT NULL,
  PRIMARY KEY (user_id, spot_id),
  CONSTRAINT fk_star_user FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE,
  CONSTRAINT fk_star_spot FOREIGN KEY (spot_id) REFERENCES SPOT(spot_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 附註：ER 圖 vs 實際實作的差異
-- ============================================================
-- 1. ER 圖的 "transition" 實體（transition_id, start_id, arrive_id...）
--    在實作中被整合進 HAS 表，arrive_id 欄位保留了鏈結串列邏輯。
--
-- 2. Relation 圖的 Spot 包含 tag_id / arrive_id / transportation 等欄位，
--    但實作中這些欄位都移至 HAS 表，SPOT 只存靜態地點資料。
--
-- 3. TAG 在 Relation 圖有 tag_id，但實作用 name 作為 PK 並在 HAS 中以
--    tag_name JOIN，無額外的 tag_id 欄位。
--
-- 4. GROUP 在 Relation 圖未列出 creator_id，但程式碼 GROUP.creator_id
--    JOIN USER 存在，已補上。
-- ============================================================
