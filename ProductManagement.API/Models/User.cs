using System;
using System.ComponentModel.DataAnnotations;

namespace ProductManagement.API.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public DateTime? LastLoginTime { get; set; }
    }
}
