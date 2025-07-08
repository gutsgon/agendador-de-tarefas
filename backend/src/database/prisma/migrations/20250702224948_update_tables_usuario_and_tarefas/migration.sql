/*
  Warnings:

  - Added the required column `usuarioId` to the `tarefas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tarefas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "horario_execucao" DATETIME NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "tarefas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tarefas" ("descricao", "horario_execucao", "id", "titulo") SELECT "descricao", "horario_execucao", "id", "titulo" FROM "tarefas";
DROP TABLE "tarefas";
ALTER TABLE "new_tarefas" RENAME TO "tarefas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
