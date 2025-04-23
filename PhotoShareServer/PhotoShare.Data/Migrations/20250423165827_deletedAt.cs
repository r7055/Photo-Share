using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoShare.Data.Migrations
{
    /// <inheritdoc />
    public partial class deletedAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "AlbumPhoto",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "AlbumPhoto",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "AlbumPhoto",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "AlbumPhoto");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "AlbumPhoto");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "AlbumPhoto");
        }
    }
}
