using System;

namespace Codesophy.Process.Parse
{
    /// <summary>
    /// TODO:
    /// </summary>
    public class StringTokenStream : ITokenStream<char>
    {
        private readonly string _tokens;

        public StringTokenStream(string tokens)
        {
            _tokens = tokens;
        }

        Token<char> ITokenStream<char>.Read()
        {
            throw new NotImplementedException(); //TODO:
        }
    }
}
