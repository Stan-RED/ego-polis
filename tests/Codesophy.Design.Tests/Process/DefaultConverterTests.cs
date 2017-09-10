#if !NETSTANDARD1_3 && !NETCOREAPP1_0
using Codesophy.Quality;
using Xunit;

namespace Codesophy.Process
{
    public class DefaultConverterTests
    {
        [Fact]
        public void When_ConvertibleTypes_ReturnsConverted()
        {
            IConvert<string, int> convert = new DefaultConverter<string, int>();

            convert.When("3").Then(3);
        }

        // TODO:More tests for failing circumstances expected.
    }
}
#endif