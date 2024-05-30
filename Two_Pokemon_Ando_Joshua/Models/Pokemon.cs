namespace Two_Pokemon_Ando_Joshua.Models
{
    public class Pokemon
    {
        public string Name { get; set; }
        public List<string> Moves { get; set; }
        public List<string> Abilities { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public List<string> Types { get; set; }
        public string SpriteUrl { get; set; }
    }
}
