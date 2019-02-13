using Xunit;

namespace Codesophy.Process.Parse
{
    /// <summary>
    /// TODO:
    /// </summary>
    public class ParserSample
    {
        [Fact]
        public void Run()
        {
            var input = "3 + 1 * 2";
            var stream = new StringTokenStream(input);
        }
    }
}
