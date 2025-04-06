﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace PhotoShare.Data.Migrations
{
    [DbContext(typeof(PhotoShareContext))]
    [Migration("20250403184404_create_db")]
    partial class create_db
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("PermissionRole", b =>
                {
                    b.Property<int>("PermissionsId")
                        .HasColumnType("int");

                    b.Property<int>("RolesId")
                        .HasColumnType("int");

                    b.HasKey("PermissionsId", "RolesId");

                    b.HasIndex("RolesId");

                    b.ToTable("PermissionRole");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.Album", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("OwnerId")
                        .HasColumnType("int");

                    b.Property<int?>("ParentId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.AlbumPhoto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AlbumId")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("PhotoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.HasIndex("PhotoId");

                    b.ToTable("AlbumPhoto");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.AlbumShare", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AlbumId")
                        .HasColumnType("int");

                    b.Property<int>("Permission")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.HasIndex("UserId");

                    b.ToTable("AlbumShare");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.Permission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Permission");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("OwnerId")
                        .HasColumnType("int");

                    b.Property<double>("Size")
                        .HasColumnType("double");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.PhotoShare", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Permission")
                        .HasColumnType("int");

                    b.Property<int>("PhotoId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PhotoId");

                    b.HasIndex("UserId");

                    b.ToTable("PhotoShare");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("PhotoId")
                        .HasColumnType("int");

                    b.Property<int?>("TagId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PhotoId");

                    b.HasIndex("TagId");

                    b.HasIndex("UserId");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("RoleUser", b =>
                {
                    b.Property<int>("RolesId")
                        .HasColumnType("int");

                    b.Property<int>("UsersId")
                        .HasColumnType("int");

                    b.HasKey("RolesId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("RoleUser");
                });

            modelBuilder.Entity("PermissionRole", b =>
                {
                    b.HasOne("PhotoShare.Core.Models.Permission", null)
                        .WithMany()
                        .HasForeignKey("PermissionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PhotoShare.Core.Models.Role", null)
                        .WithMany()
                        .HasForeignKey("RolesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PhotoShare.Core.Models.Album", b =>
                {
                    b.HasOne("PhotoShare.Core.Models.Album", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentId");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.AlbumPhoto", b =>
                {
                    b.HasOne("PhotoShare.Core.Models.Album", "Album")
                        .WithMany("AlbumPhotos")
                        .HasForeignKey("AlbumId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PhotoShare.Core.Models.Photo", "Photo")
                        .WithMany("PhotoAlbums")
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Album");

                    b.Navigation("Photo");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.AlbumShare", b =>
                {
                    b.HasOne("PhotoShare.Core.Models.Album", "Album")
                        .WithMany("Users")
                        .HasForeignKey("AlbumId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PhotoShare.Core.Models.User", "User")
                        .WithMany("Albums")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Album");

                    b.Navigation("User");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.PhotoShare", b =>
                {
                    b.HasOne("PhotoShare.Core.Models.Photo", "Photo")
                        .WithMany("Users")
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PhotoShare.Core.Models.User", "User")
                        .WithMany("Photos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Photo");

                    b.Navigation("User");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.Tag", b =>
                {
                    b.HasOne("PhotoShare.Core.Models.Photo", null)
                        .WithMany("Tags")
                        .HasForeignKey("PhotoId");

                    b.HasOne("PhotoShare.Core.Models.Tag", null)
                        .WithMany("Photos")
                        .HasForeignKey("TagId");

                    b.HasOne("PhotoShare.Core.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("RoleUser", b =>
                {
                    b.HasOne("PhotoShare.Core.Models.Role", null)
                        .WithMany()
                        .HasForeignKey("RolesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PhotoShare.Core.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PhotoShare.Core.Models.Album", b =>
                {
                    b.Navigation("AlbumPhotos");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.Photo", b =>
                {
                    b.Navigation("PhotoAlbums");

                    b.Navigation("Tags");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.Tag", b =>
                {
                    b.Navigation("Photos");
                });

            modelBuilder.Entity("PhotoShare.Core.Models.User", b =>
                {
                    b.Navigation("Albums");

                    b.Navigation("Photos");
                });
#pragma warning restore 612, 618
        }
    }
}
