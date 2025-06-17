-- CreateTable
CREATE TABLE "Actor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "avatar_url" TEXT NOT NULL,
    "abilities" JSONB NOT NULL,
    "skills" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Actor_name_key" ON "Actor"("name");
