
### A/B Testing 의사결정RL 코드
### R code to calculate sample size empirically


```R
## Strategy: For a bunch of Ns, compute the z_star by achieving desired alpha, then
## compute what beta would be for that N using the acquired z_star. 
## Pick the smallest N at which beta crosses the desired value

# Inputs:
#   The desired alpha for a two-tailed test
# Returns: The z-critical value
get_z_star = function(alpha) {
    return(-qnorm(alpha / 2))
}
```


```R
?qnorm
```





<table width="100%" summary="page for Normal {stats}"><tr><td>Normal {stats}</td><td style="text-align: right;">R Documentation</td></tr></table>

<h2>The Normal Distribution</h2>

<h3>Description</h3>

<p>Density, distribution function, quantile function and random
generation for the normal distribution with mean equal to <code>mean</code>
and standard deviation equal to <code>sd</code>.
</p>


<h3>Usage</h3>

<pre>
dnorm(x, mean = 0, sd = 1, log = FALSE)
pnorm(q, mean = 0, sd = 1, lower.tail = TRUE, log.p = FALSE)
qnorm(p, mean = 0, sd = 1, lower.tail = TRUE, log.p = FALSE)
rnorm(n, mean = 0, sd = 1)
</pre>


<h3>Arguments</h3>

<table summary="R argblock">
<tr valign="top"><td><code>x, q</code></td>
<td>
<p>vector of quantiles.</p>
</td></tr>
<tr valign="top"><td><code>p</code></td>
<td>
<p>vector of probabilities.</p>
</td></tr>
<tr valign="top"><td><code>n</code></td>
<td>
<p>number of observations. If <code>length(n) &gt; 1</code>, the length
is taken to be the number required.</p>
</td></tr>
<tr valign="top"><td><code>mean</code></td>
<td>
<p>vector of means.</p>
</td></tr>
<tr valign="top"><td><code>sd</code></td>
<td>
<p>vector of standard deviations.</p>
</td></tr>
<tr valign="top"><td><code>log, log.p</code></td>
<td>
<p>logical; if TRUE, probabilities p are given as log(p).</p>
</td></tr>
<tr valign="top"><td><code>lower.tail</code></td>
<td>
<p>logical; if TRUE (default), probabilities are
<i>P[X &le; x]</i> otherwise, <i>P[X &gt; x]</i>.</p>
</td></tr>
</table>


<h3>Details</h3>

<p>If <code>mean</code> or <code>sd</code> are not specified they assume the default
values of <code>0</code> and <code>1</code>, respectively.
</p>
<p>The normal distribution has density
</p>
<p style="text-align: center;"><i>
    f(x) = 1/(&radic;(2 &pi;) &sigma;) e^-((x - &mu;)^2/(2 &sigma;^2))
  </i></p>

<p>where <i>&mu;</i> is the mean of the distribution and
<i>&sigma;</i> the standard deviation.
</p>


<h3>Value</h3>

<p><code>dnorm</code> gives the density,
<code>pnorm</code> gives the distribution function,
<code>qnorm</code> gives the quantile function, and
<code>rnorm</code> generates random deviates.
</p>
<p>The length of the result is determined by <code>n</code> for
<code>rnorm</code>, and is the maximum of the lengths of the
numerical arguments for the other functions.  
</p>
<p>The numerical arguments other than <code>n</code> are recycled to the
length of the result.  Only the first elements of the logical
arguments are used.
</p>
<p>For <code>sd = 0</code> this gives the limit as <code>sd</code> decreases to 0, a
point mass at <code>mu</code>.
<code>sd &lt; 0</code> is an error and returns <code>NaN</code>.
</p>


<h3>Source</h3>

<p>For <code>pnorm</code>, based on
</p>
<p>Cody, W. D. (1993)
Algorithm 715: SPECFUN &ndash; A portable FORTRAN package of special
function routines and test drivers.
<em>ACM Transactions on Mathematical Software</em> <b>19</b>, 22&ndash;32.
</p>
<p>For <code>qnorm</code>, the code is a C translation of
</p>
<p>Wichura, M. J. (1988)
Algorithm AS 241: The percentage points of the normal distribution.
<em>Applied Statistics</em>, <b>37</b>, 477&ndash;484.
</p>
<p>which provides precise results up to about 16 digits.
</p>
<p>For <code>rnorm</code>, see RNG for how to select the algorithm and
for references to the supplied methods.
</p>


<h3>References</h3>

<p>Becker, R. A., Chambers, J. M. and Wilks, A. R. (1988)
<em>The New S Language</em>.
Wadsworth &amp; Brooks/Cole.
</p>
<p>Johnson, N. L., Kotz, S. and Balakrishnan, N. (1995)
<em>Continuous Univariate Distributions</em>, volume 1, chapter 13.
Wiley, New York.
</p>


<h3>See Also</h3>

<p>Distributions for other standard distributions, including
<code>dlnorm</code> for the <em>Log</em>normal distribution.
</p>


<h3>Examples</h3>

<pre>
require(graphics)

dnorm(0) == 1/sqrt(2*pi)
dnorm(1) == exp(-1/2)/sqrt(2*pi)
dnorm(1) == 1/sqrt(2*pi*exp(1))

## Using "log = TRUE" for an extended range :
par(mfrow = c(2,1))
plot(function(x) dnorm(x, log = TRUE), -60, 50,
     main = "log { Normal density }")
curve(log(dnorm(x)), add = TRUE, col = "red", lwd = 2)
mtext("dnorm(x, log=TRUE)", adj = 0)
mtext("log(dnorm(x))", col = "red", adj = 1)

plot(function(x) pnorm(x, log.p = TRUE), -50, 10,
     main = "log { Normal Cumulative }")
curve(log(pnorm(x)), add = TRUE, col = "red", lwd = 2)
mtext("pnorm(x, log=TRUE)", adj = 0)
mtext("log(pnorm(x))", col = "red", adj = 1)

## if you want the so-called 'error function'
erf &lt;- function(x) 2 * pnorm(x * sqrt(2)) - 1
## (see Abramowitz and Stegun 29.2.29)
## and the so-called 'complementary error function'
erfc &lt;- function(x) 2 * pnorm(x * sqrt(2), lower = FALSE)
## and the inverses
erfinv &lt;- function (x) qnorm((1 + x)/2)/sqrt(2)
erfcinv &lt;- function (x) qnorm(x/2, lower = FALSE)/sqrt(2)
</pre>

<hr /><div style="text-align: center;">[Package <em>stats</em> version 3.2.2 ]</div>




```R
# Inputs:
#   z-star: The z-critical value
#   s: The variance of the metric at N=1
#   d_min: The practical significance level
#   N: The sample size of each group of the experiment
# Returns: The beta value of the two-tailed test
get_beta = function(z_star, s, d_min, N) {
    SE = s /  sqrt(N)
    return(pnorm(z_star * SE, mean=d_min, sd=SE))
}
```


```R
# Inputs:
#   s: The variance of the metric with N=1 in each group
#   d_min: The practical significance level
#   Ns: The sample sizes to try
#   alpha: The desired alpha level of the test
#   beta: The desired beta level of the test
# Returns: The smallest N out of the given Ns that will achieve the desired
#          beta. There should be at least N samples in each group of the experiment.
#          If none of the given Ns will work, returns -1. N is the number of
#          samples in each group.

required_size = function(s, d_min, Ns=1:20000, alpha=0.05, beta=0.2) {
    for (N in Ns) {
        if (get_beta(get_z_star(alpha), s, d_min, N) <= beta) {
            return(N)
        }
    }
    
    return(-1)
}
```


```R
# Example analytic usage
# This is the example from Lesson 1, for which the online calculate gave 3,623
# samples in each group

# s is the pooled standard error for N=1 in each group,
# which is sqrt(p*(1-p)*(1/1 + 1/1))
required_size(s=sqrt(0.1*0.9*2), d_min=0.02)
```




3532




```R
# Sizing: Example
# Cookie-based diversion
# Since the standard error is proportional to 1/sqrt(N), s, or
# the standard error for N=1, is equal to the mesaured standard error with 5000
# in each group times sqrt(5000)
required_size(s=0.00515*sqrt(5000), d_min=0.02)
```




2603




```R
# User-id-based diversion
required_size(s=0.0119*sqrt(5000), d_min=0.02)
```




13894




```R
# Sizing: Quiz
# Original size
required_size(s=0.0628*sqrt(1000), d_min=0.01, Ns=seq(10, 500000, 100))
```




309610




```R
# Size with event-based diversion
required_size(s=0.0209*sqrt(1000), d_min=0.01, Ns=seq(10, 500000, 100))
```




34310




```R
# Size with event-based diversion and English-only traffic
required_size(s=0.0188*sqrt(1000), d_min=0.015)
```




12330




```R
# Size with cookie-based diversion, English-only traffic, and 
# click-through-probability instead of click-through-rate
required_size(s=0.0445*sqrt(1000), d_min=0.015, Ns=seq(10, 500000, 100))
```




69110


