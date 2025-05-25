using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoShare.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedAtToShares : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "PhotoShare",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "PhotoShare",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "PhotoShare",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "PhotoShare",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "AlbumShare",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "AlbumShare",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "AlbumShare",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "AlbumShare",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "PhotoShare");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "PhotoShare");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "PhotoShare");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "PhotoShare");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "AlbumShare");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "AlbumShare");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "AlbumShare");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "AlbumShare");
        }
    }
}
