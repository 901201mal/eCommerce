using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SigmaReader
{
    public class Book
    {
        //(datatyp string): Författare
        public string Author { get; set; }

        //(datatyp string):Bokens titel
        public string Title { get; set; }

        //(datatyp string): Vilken kategori boken tillhör
        public string Genre { get; set; }

        //(datatyp decimal): Bokens pris i USD
        public decimal Price { get; set; }

        //(datatyp date): Datum då boken utgavs
        public string PublishDate { get; set; }

        //(datatyp string): Kort beskrivning av boken
        public string Description { get; set; }

        public Book CreateBook(string in_Author, string in_Title, string in_Genre, decimal in_Price, string in_PublishDate, string in_Description)
        {
            Book book = new Book();
            book.Author = in_Author;
            book.Title = in_Title;
            book.Genre = in_Genre;
            book.Price = in_Price;
            book.PublishDate = in_PublishDate;
            book.Description = in_Description;
            return book;
        }
    }


   
}