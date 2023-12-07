-- CreateTable
CREATE TABLE "laundry" (
    "id" SERIAL NOT NULL,
    "nama_lengkap" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nomor_telepon" TEXT,
    "nama_laundry" TEXT,
    "foto_laundry" TEXT,
    "alamat" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "password_token" TEXT,
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "laundry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "layanan" (
    "id" SERIAL NOT NULL,
    "nama_layanan" TEXT,
    "harga_layanan" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "laundryId" INTEGER,

    CONSTRAINT "layanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nomor_telepon" TEXT,
    "foto_profil" TEXT,
    "alamat" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "password_token" TEXT,
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "order_trx" TEXT NOT NULL,
    "estimasi_berat" DOUBLE PRECISION NOT NULL,
    "harga_total" BIGINT NOT NULL,
    "catatan" TEXT,
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "laundryId" INTEGER,
    "layananId" INTEGER,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "laundry_email_key" ON "laundry"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- AddForeignKey
ALTER TABLE "layanan" ADD CONSTRAINT "layanan_laundryId_fkey" FOREIGN KEY ("laundryId") REFERENCES "laundry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_laundryId_fkey" FOREIGN KEY ("laundryId") REFERENCES "laundry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_layananId_fkey" FOREIGN KEY ("layananId") REFERENCES "layanan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
