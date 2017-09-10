using Codesophy.Quality;
using Xunit;

namespace Codesophy.Configuration
{
    public class AppSettingExceptionTests
    {
        const string NAME = "SettingName";
        private readonly TestException Exception = new TestException();

        [Fact]
        public void Ctor_ArgsProvided_PropagatedToProperties()
        {
            var exception = new AppSettingException(NAME, Exception);

            Assert.Equal(NAME, exception.Name);
            Assert.Equal(Exception, exception.InnerException);
        }
    }
}
