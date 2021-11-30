    //--------------------------------------------------------------------------------------------------
    //
    //  JAVASCRIPT HINTS
    //
    //--------------------------------------------------------------------------------------------------
    //
    //  1 - Suppose you have two functions, function1() and function2().
    //  Suppose function1() calls function2() and both have for loops.
    //  USE IN BOTH FUNCTIONS
    //                                      for (var i = 0; i < whatever; i++) { whatever }
    //  NEVER USE IN BOTH FUNCTIONS
    //                                      for (i = 0; i < whatever; i++) { whatever }
    //
    //  (page CD-53 of Danny Goodman's JavaScript The Bible Gold Edition)
    //
    //--------------------------------------------------------------------------------------------------
    //
    //  2 - USE
    //                      window.document.forms[0].<SELECT>.value
    //                      window.document.getElementById(<ELEMENT_ID>).<SELECT>.value
    //  INSTEAD OF
    //                      window.document.forms[0].times.options[window.document.forms[0].<SELECT>.selectedIndex].value
    //                      window.document.getElementById(<ELEMENT_ID>).<SELECT>.options[window.document.forms[0].<SELECT>.selectedIndex].value
    //
    //  OTHERWISE IT WON'T WORK ON IE7+
    //
    //  (page 605 of Danny Goodman's JavaScript The Bible Gold Edition)
    //
    //--------------------------------------------------------------------------------------------------
    //
    //  3 - In recursive functions, attention to where you're gonna put a "return;",
    //  because it may return to the function itself (it's recursive, remember?).
    //
    //--------------------------------------------------------------------------------------------------
    //
    //  4 - In JavaScript, we have common arrays, indexed by numbers, and
    //  associative arrays (also called hash tables), indexed by whatever.
    //
    //  Examples:
    //
    //  Common array -> myArray = new Array("Athens", "Belgrade", "Cairo");
    //                  document.write(myArray[1]);         //  will print "Belgrade"
    //
    //  Hash table ->   myArray = {"a" : "Athens", "b" : "Belgrade", "c" : "Cairo" };
    //                  document.write(myArray[1]);         //  won't work
    //                  document.write(myArray["b"]);       //  will print "Belgrade"
    //
    //  To iterate through hash tables (also works with common arrays):
    //
    //                                          for (var key in myArray)
    //                                          {
    //                                              //  code here
    //                                          }
    //
    //  To iterate through n-dimensional hash tables (also works with common arrays):
    //
    //                                          for (var key1 in myArray)
    //                                          {
    //                                              for (var key2 in myArray[key1])
    //                                              {
    //                                                  //  code here
    //                                              }
    //                                          }
    //
    //  THE key IN THAT LOOP IS STRING, NOT INTEGER, EVEN IN COMMON ARRAYS.
    //  So, in a common array, you'll have to use parseInt(key) to use key as an integer.
    //
    //--------------------------------------------------------------------------------------------------
    //
    //  function compare2(array, left, right)
    //  {
    //
    //      var depth = 0;
    //
    //      while (depth < array[left].length && depth < array[right].length)
    //      {
    //
    //          if (array[left][depth] < array[right][depth])
    //              return 1;
    //          else if (array[left][depth] > array[right][depth])
    //              return -1;
    //
    //          depth++;
    //
    //      }
    //
    //      return 0;
    //
    //  }
    //
    //  function qsort(array, lo, hi)
    //  {
    //
    //      var low = lo;
    //      var high = hi;
    //      mid = Math.floor((low + high) / 2);
    //
    //      do
    //      {
    //          while (compare2(array, low, mid) > 0)
    //              low++;
    //
    //          while (compare2(array, high, mid) < 0)
    //              high--;
    //
    //          if (low <= high)
    //          {
    //              swap(array, low, high);
    //              low++;
    //              high--;
    //          }
    //
    //      }
    //      while (low <= high);
    //
    //      if (high > lo)
    //          qsort(array, lo, high);
    //
    //      if (low < hi)
    //          qsort(array, low, hi);
    //
    //  }
    //
    //  function swap(a, i, j)
    //  {
    //
    //      var tmp = a[i];
    //      a[i] = a[j];
    //      a[j] = tmp;
    //
    //  }
    //
    //--------------------------------------------------------------------------------------------------

    var lTimes;
    var tTimes;
    var tabelaPartidas = false;

//-------------------------------------------------------------------------------------

    function initData()
    {
        lTimes = window.document.getElementById("fTimes").times.options.length;
        initTimes();
        printClassif();
    }

//-------------------------------------------------------------------------------------

    function initTimes()
    {
        tTimes = null;

        tTimes = new Array();

        for (var k = 0; k < lTimes; k++)
        {
            tTimes[k] = new Team(window.document.getElementById("fTimes").times.options[k].value);
        }
    }

//-------------------------------------------------------------------------------------

    //  points > wins > saldo > golspro > golscontra > history_of_games (confronto direto)
    function compararTimes(a, b)
    {
        if (b["points"] == a["points"])
        {
            if (b["wins"] == a["wins"])
            {
                if (b["saldo"] == a["saldo"])
                {
                    if (b["golspro"] == a["golspro"])
                    {
                        if (a["golscontra"] == b["golscontra"])
                        {
                            var cdA = a["history_of_games"];
                            var placarA = 0;
                            var placarB = 0;
                            for (var i = 0; i < cdA.length; i++)
                            {
                                if (cdA[i]["oponent_name"] == b["name"])
                                {
                                    placarA = cdA[i]["my_score"];
                                    placarB = cdA[i]["oponent_score"];
                                }
                            }
                            return placarB - placarA;
                        }
                        else
                        {
                            return a["golscontra"] - b["golscontra"];
                        }
                    }
                    else
                    {
                        return b["golspro"] - a["golspro"];
                    }
                }
                else
                {
                    return b["saldo"] - a["saldo"];
                }
            }
            else
            {
                return b["wins"] - a["wins"];
            }
        }
        else
        {
            return b["points"] - a["points"];
        }
    }

//-------------------------------------------------------------------------------------

    function printClassif()
    {
        var classDiv;
        var nArray = new Array();

        for (var i = 0; i < lTimes; i++)
        {
            nArray[i] = tTimes[i];
        }

        nArray.sort(compararTimes);

        classDiv = "<table>";
        classDiv += "<caption>";
        classDiv += "Classificação:";
        classDiv += "</caption>";
        classDiv += "<tr>";
        classDiv += "<th>";
        classDiv += "Pos";
        classDiv += "</th>";
        classDiv += "<th>";
        classDiv += "R";
        classDiv += "</th>";
        classDiv += "<th>";
        classDiv += "Time";
        classDiv += "</th>";
        classDiv += "<th>";
        classDiv += "Pontos";
        classDiv += "</th>";
        classDiv += "<th>";
        classDiv += "Vitórias";
        classDiv += "</th>";
        classDiv += "<th>";
        classDiv += "Empates";
        classDiv += "</th>";
        classDiv += "<th>";
        classDiv += "Derrotas";
        classDiv += "</th>";
        classDiv += "<th>";
        classDiv += "SG";
        classDiv += "</th>";
        classDiv += "<th>";
        classDiv += "GP";
        classDiv += "</th>";
        classDiv += "<th>";
        classDiv += "GC";
        classDiv += "</th>";
        classDiv += "</tr>";
        for (var key1 in nArray)
        {
            classDiv += "<tr>" + "<td><center>" + (parseInt(key1) + 1) + "</center></td>";
            for (var key2 in nArray[key1])
            {
                if ((key2 == "history_of_games") || (key2 == "printStats"))
                    continue;
                classDiv += "<td><center>" + nArray[key1][key2] + "</center></td>";
            }
            classDiv += "</tr>";
        }
        classDiv += "</table>";
        window.document.getElementById("teamClassifDiv").innerHTML = classDiv;
        nArray = null;
    }

//-------------------------------------------------------------------------------------

    function gamesHistory(msc, vnm, vsc)
    {
        this.my_score = msc;
        this.oponent_name = vnm;
        this.oponent_score = vsc;
    }

//-------------------------------------------------------------------------------------

    function Game(homeTeam, visitorTeam, homeScore, visitorScore)
    {
        homeTeam.history_of_games[homeTeam.wins + homeTeam.losses + homeTeam.draws] = new gamesHistory(homeScore, visitorTeam.name, visitorScore);
        visitorTeam.history_of_games[visitorTeam.wins + visitorTeam.losses + visitorTeam.draws] = new gamesHistory(visitorScore, homeTeam.name, homeScore);

        if (homeScore > visitorScore)
        {
            homeTeam.wins += 1;
            homeTeam.points += 3;
            visitorTeam.losses += 1;
        }
        else if (homeScore < visitorScore)
        {
            visitorTeam.wins += 1;
            visitorTeam.points += 3;
            homeTeam.losses += 1;
        }
        else
        {
            homeTeam.draws += 1;
            visitorTeam.draws += 1;
            homeTeam.points += 1;
            visitorTeam.points += 1;
        }

        homeTeam.golspro += homeScore;
        homeTeam.golscontra += visitorScore;
        homeTeam.saldo += (homeScore - visitorScore);

        visitorTeam.golspro += visitorScore;
        visitorTeam.golscontra += homeScore;
        visitorTeam.saldo += (visitorScore - homeScore);

		homeTeam.round += 1;
		visitorTeam.round += 1;

        window.document.getElementById("teamGamesDiv").innerHTML += homeTeam.name + " " + homeScore + " x " + visitorScore + " " + visitorTeam.name + "<br />";
    }

//-------------------------------------------------------------------------------------

    function allGames(hgames)
    {
        var strr = "";

        for (var i = 0; i < hgames.length; i++)
        {
            strr += hgames[i].my_score;
            strr += " x ";
            strr += hgames[i].oponent_score;
            strr += " ";
            strr += hgames[i].oponent_name;
            //  also works:     strr += hgames[i]["oponent_name"];
            //  doesn't work:   strr += hgames[i][1];
            strr += "<br />";
        }

        return strr;
    }

//-------------------------------------------------------------------------------------

    function printStats()
    {
        var stats = "";

        stats = "Estatísticas do ";
        stats += this.name;
        stats += "<br /><br />Pontos: ";
        stats += this.points;
        stats += "<br />Vitórias: ";
        stats += this.wins;
        stats += "<br />Empates: ";
        stats += this.draws;
        stats += "<br />Derrotas: ";
        stats += this.losses;
        stats += "<br />Gols Pró: ";
        stats += this.golspro;
        stats += "<br />Gols Contra: ";
        stats += this.golscontra;
        stats += "<br />Saldo: ";
        stats += this.saldo;
        stats += "<br /><br />Partidas:<br /><br />";
        stats += allGames(this.history_of_games);
        stats += "<br />";
        window.document.getElementById("teamStatsDiv").innerHTML += stats;
    }

//-------------------------------------------------------------------------------------

    function Team(name)
    {
        this.round = 0;
        this.name = name;
        this.points = 0;
        this.wins = 0;
        this.draws = 0;
        this.losses = 0;
		this.saldo = 0;
		this.golspro = 0;
		this.golscontra = 0;
		this.printStats = printStats;
		this.history_of_games = new Array();        
    }

//-------------------------------------------------------------------------------------

    function recursivePlay(timeCasa, indexCasa, indexVisita, rodadaAnterior, rodadaAtual)
    {
        if (indexCasa == indexVisita)
        {
		    recursivePlay(timeCasa, indexCasa, indexVisita + 1, rodadaAnterior, rodadaAtual);
		    return;
		}

		if (timeCasa.round == rodadaAtual)
		{
			return;
		}

		if (tTimes[indexVisita].round == rodadaAtual)
		{
		    recursivePlay(timeCasa, indexCasa, indexVisita + 1, rodadaAnterior, rodadaAtual);
		    return;
		}

		if (rodadaAnterior == 0)
		{
			Game(timeCasa, tTimes[indexVisita], Math.floor(Math.random() * 4), Math.floor(Math.random() * 4));
            return;
        }

        var oponenteAnterior = timeCasa.history_of_games[rodadaAnterior - 1].oponent_name;
        var oponenteAtual = tTimes[indexVisita].name;
        if (oponenteAnterior == oponenteAtual)
        {
			recursivePlay(timeCasa, indexCasa, indexVisita + 1, rodadaAtual - 1, rodadaAtual);
        }
        else
        {
			recursivePlay(timeCasa, indexCasa, indexVisita, rodadaAnterior - 1, rodadaAtual);
		}
    }

//-------------------------------------------------------------------------------------

    function teamsPlay()
    {
        if (lTimes != 8)
        {
            window.alert("Para jogar, é preciso que haja\nexatamente oito times.");
            return;
        }

        if (tTimes[0].round == (lTimes - 1))
        {
            initTimes();
            window.document.getElementById("teamGamesDiv").innerHTML = "";
            window.document.getElementById("teamStatsDiv").innerHTML = "";
        }

		var rodadaAnterior = tTimes[0].round;
		var rodadaAtual = rodadaAnterior + 1;
		window.document.getElementById("teamGamesDiv").innerHTML += "Rodada " + rodadaAtual + ":<br />";

		for (var i = 0; i < lTimes; i++)
		{
			recursivePlay(tTimes[i], i, 0, rodadaAnterior, rodadaAtual);
		}

		if (rodadaAtual == lTimes - 1)
		{
		    var nArray = new Array();
		    for (var i = 0; i < lTimes; i++)
		    {
		        nArray[i] = tTimes[i];
		    }
		    nArray.sort(compararTimes);
		    window.document.getElementById("teamGamesDiv").innerHTML += "<br /><br />O " + nArray[0].name + " é campeão carioca.";
		    nArray = null;
		}
		else
		{
		    window.document.getElementById("teamGamesDiv").innerHTML += "<br />";
		}

        printClassif();
    }

//-------------------------------------------------------------------------------------

    function teamsPrint()
    {
        window.document.getElementById("teamStatsDiv").innerHTML = "";

        var iTimes = window.document.getElementById("fTimes").times.selectedIndex;

        if ((iTimes != -1) && (lTimes > 0))
        {
            tTimes[iTimes].printStats();
            return;
        }
        if ((iTimes == -1) && (lTimes > 0))
        {
            window.alert("Selecione um time.");
            return;
        }
        if (lTimes < 1)
            window.alert("Não há times.");
    }

//-------------------------------------------------------------------------------------

    function teamExclude()
    {
        var iTimes = window.document.getElementById("fTimes").times.selectedIndex;
        var nTimes = window.document.getElementById("fTimes").times.value;

        if ((iTimes != -1) && (lTimes > 0))
        {
            window.alert("O time do " + nTimes + " será excluído.");
            window.document.getElementById("fTimes").times.options[iTimes] = null;
            //  doesn't work: window.document.getElementById("fTimes").times.value = null;
            window.document.getElementById("fTimes").times.size -= 1;
            initData();
            window.document.getElementById("teamGamesDiv").innerHTML = "";
            window.document.getElementById("teamStatsDiv").innerHTML = "";
            tabelaPartidas = false;
        }

        if ((iTimes == -1) && (lTimes > 0))
            window.alert("Selecione um time.");

        if (lTimes < 1)
            window.alert("Não há times.");
    }

//-------------------------------------------------------------------------------------

    function teamInclude()
    {
        if (window.document.getElementById("fTimes").txtTimes.value == "")
        {
            window.alert("Digite o nome do time.");
        }
        else
        {
            nomeTime = window.document.getElementById("fTimes").txtTimes.value;
            window.document.getElementById("fTimes").times.options[lTimes] = new Option(nomeTime, nomeTime);
            window.document.getElementById("fTimes").times.size += 1;
            initData();
            window.document.getElementById("teamGamesDiv").innerHTML = "";
            window.document.getElementById("teamStatsDiv").innerHTML = "";
            window.document.getElementById("fTimes").txtTimes.value = "";
            tabelaPartidas = false;
        }
    }

//-------------------------------------------------------------------------------------

    function isOdd(number)
    {
        if ((number % 2) == 0)
            return true;
        else
            return false;
    }

//-------------------------------------------------------------------------------------

    function teamsGames()
    {
        if (!tabelaPartidas)
        {
            var nArray = new Array();

            for (var i = 0; i < lTimes; i++)
            {
                nArray[i] = new Team(window.document.getElementById("fTimes").times.options[i].value);
            }

            do
            {
                var array_of_games = new Array();
                var aVar = 0;
                var rodadaAnterior = nArray[0].round;
                var rodadaAtual = rodadaAnterior + 1;

                for (var i = 0; ; )
                {
                    for (var j = 0; ; )
                    {
                        if ((!isOdd(lTimes)) && (i == (lTimes - rodadaAtual)))
                        {
                            break;
                        }

                        if ((!isOdd(lTimes)) && (j == (lTimes - rodadaAtual)))
                        {
                            if (j >= (lTimes - 1))
                                break;
                            else
                                j++;
                            continue;
                        }

                        if (i == j)
                        {
                            j++;
                            continue;
                        }

                        if ((i < lTimes) && (nArray[i].round == rodadaAtual))
                        {
                            break;
                        }

                        if ((j < lTimes) && (nArray[j].round == rodadaAtual))
                        {
                            j++;
                            continue;
                        }

                        if ((i < lTimes) && (j < lTimes) && (recursiveGames(nArray, i, j, rodadaAnterior, rodadaAtual) == 0))
                        {
                            j++;
                            continue;
                        }

                        if ((i < lTimes) && (j < lTimes) && (recursiveGames(nArray, i, j, rodadaAnterior, rodadaAtual) == 1))
                        {
                            nArray[i].round += 1;
                            nArray[j].round += 1;
                            array_of_games[aVar] = new Array(i, j);
                            aVar++;
                            break;
                        }

                        if ((aVar > 0) && (recursiveGames(nArray, i, j, rodadaAnterior, rodadaAtual) == -1))
                        {
                            i = array_of_games[aVar - 1][0];
                            j = array_of_games[aVar - 1][1] + 1;
                            nArray[array_of_games[aVar - 1][0]].round -= 1;
                            nArray[array_of_games[aVar - 1][1]].round -= 1;
                            array_of_games[aVar - 1] = null;
                            aVar--;
                            continue;
                        }

                        if ((i < lTimes) && (j < lTimes) && (aVar <= 0) && (recursiveGames(nArray, i, j, rodadaAnterior, rodadaAtual) == -1))
                        {
                            return;
                        }

                        if (j >= (lTimes - 1))
                            break;
                        else
                            j++;
                    }

                    if (i >= (lTimes - 1))
                        break;
                    else
                        i++;
                }

                if (!isOdd(lTimes))
                {
                    nArray[lTimes - rodadaAtual].round += 1;
                    nArray[lTimes - rodadaAtual].draws += 1;
                    nArray[lTimes - rodadaAtual].history_of_games[rodadaAnterior] = new gamesHistory(0, "FOLGA", 0);
                }

                window.document.getElementById("teamStatsDiv").innerHTML += "Rodada " + rodadaAtual + ":<br />";

                for (var key1 in array_of_games)
                {
                    GameTwo(nArray[array_of_games[key1][0]], nArray[array_of_games[key1][1]], 0, 0);
                    window.document.getElementById("teamStatsDiv").innerHTML += nArray[array_of_games[key1][0]].name + " x " + nArray[array_of_games[key1][1]].name + "<br />";
                }

                window.document.getElementById("teamStatsDiv").innerHTML += "<br />";

                array_of_games = null;

                if (((!isOdd(lTimes)) && (rodadaAtual == lTimes)) || ((isOdd(lTimes)) && (rodadaAtual == (lTimes - 1))))
                {
                    tabelaPartidas = true;
                    break;
                }
            }
            while (true)

            nArray = null;
        }
    }

//-------------------------------------------------------------------------------------

    function recursiveGames(arrayTimes, indexCasa, indexVisita, rodadaAnterior, rodadaAtual)
    {
        if (indexVisita >= lTimes)
        {
            return -1;
        }

        if (rodadaAnterior <= 0)
        {
            return 1;
        }

        if (arrayTimes[indexCasa].history_of_games[rodadaAnterior - 1].oponent_name == arrayTimes[indexVisita].name)
        {
            return 0;
        }
        else
        {
            return recursiveGames(arrayTimes, indexCasa, indexVisita, rodadaAnterior - 1, rodadaAtual);
        }
    }

//-------------------------------------------------------------------------------------

    function GameTwo(homeTeam, visitorTeam, homeScore, visitorScore)
    {
        homeTeam.history_of_games[homeTeam.wins + homeTeam.losses + homeTeam.draws] = new gamesHistory(homeScore, visitorTeam.name, visitorScore);
        visitorTeam.history_of_games[visitorTeam.wins + visitorTeam.losses + visitorTeam.draws] = new gamesHistory(visitorScore, homeTeam.name, homeScore);

        homeTeam.draws += 1;
        visitorTeam.draws += 1;
    }

//-------------------------------------------------------------------------------------

    function teamMove(direction)
    {
        var iTimes = window.document.getElementById("fTimes").times.selectedIndex;
        var nTimes = window.document.getElementById("fTimes").times.value;

        if ((iTimes == -1) && (lTimes > 0))
        {
            window.alert("Selecione um time.");
            return;
        }

        if (((iTimes + direction) < 0) || ((iTimes + direction) >= lTimes))
        {
            window.alert("Impossível mover.");
            return;
        }

        if ((iTimes != -1) && (lTimes > 0))
        {
            var auxTime = window.document.getElementById("fTimes").times.options[iTimes + direction].value;
            window.document.getElementById("fTimes").times.options[iTimes + direction] = new Option(nTimes, nTimes, false, true);
            window.document.getElementById("fTimes").times.options[iTimes] = new Option(auxTime, auxTime, false, false);
            initData();
            window.document.getElementById("teamGamesDiv").innerHTML = "";
            window.document.getElementById("teamStatsDiv").innerHTML = "";
            tabelaPartidas = false;
        }

        if (lTimes < 1)
            window.alert("Não há times.");
    }