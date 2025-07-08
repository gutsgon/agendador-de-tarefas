/*
  Warnings:

  - Added the required column `horario_execucao` to the `tarefas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tarefas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "horario_execucao" DATETIME NOT NULL
);
INSERT INTO "new_tarefas" ("descricao", "id", "titulo") SELECT "descricao", "id", "titulo" FROM "tarefas";
DROP TABLE "tarefas";
ALTER TABLE "new_tarefas" RENAME TO "tarefas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
